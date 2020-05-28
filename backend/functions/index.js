const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const serviceAccount = require("./.serviceAccountKey.json");
const admin = require('firebase-admin');
const {blackmailEmailString, reminderEmailString, approvedEmailString, rejectedEmailString} = require("./emailTemplate");

sgMail.setApiKey(functions.config().sendgrid.key);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'blackmail-ec269.appspot.com'
});

const runtimeOpts = {
  timeoutSeconds: 540,
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

let grabPassedDeadlines = async () => {
  const lastDate = new Date();

  const deadlines = await db.collection('expiring').where('date', '<=', lastDate).get();

  const promises = [];
  const ids = [];
  deadlines.forEach((deadline) => {
    const {uid, did} = deadline.data();
    promises.push(db.collection('users').doc(uid).collection('deadlines').doc(did).get());
    ids.push({uid:uid, did:did, expiringId:deadline.id});
  });
  const resolvedPromises = await Promise.all(promises); 

  results = []
  for(let i = 0; i < ids.length; i ++){
    results.push({...ids[i], ...resolvedPromises[i].data()})
  }
  return results;
}


let grabReminderDeadlines = async () => {
  const upperBound = new Date();
  const lowerBound = new Date();
  upperBound.setTime(upperBound.getTime() + 30 * 60 * 60 * 1000);
  lowerBound.setTime(lowerBound.getTime() + 23 * 60 * 60 * 1000);

  const deadlines = await db.collection('expiring').where('date', '>=', lowerBound).where('date', '<=', upperBound).get();

  const promises = [];
  const ids = [];
  deadlines.forEach((deadline) => {
    const {uid, did, needsReminderEmail} = deadline.data();
    if(needsReminderEmail){
      promises.push(db.collection('users').doc(uid).collection('deadlines').doc(did).get());
      ids.push({uid:uid, did:did, expiringId:deadline.id});
    }
  });
  const resolvedPromises = await Promise.all(promises); 

  results = []
  for(let i = 0; i < ids.length; i ++){
    results.push({...ids[i], ...resolvedPromises[i].data()})
  }
  return results;
}

// singular deadline
let grabBlackmail = async (deadline) => {
  blackmails = []
  const {uid, did} = deadline;
  const path = [uid, did, 'blackmail'].join('/');

  const [files] = await bucket.getFiles({prefix:path});
  
  const filePromises = [];
  files.forEach(file => {
    filePromises.push(file.download());
  })
  const downloadedFiles = await Promise.all(filePromises);

  const attachments = []

  for(let i = 0; i < downloadedFiles.length; i ++){
    const fileNamePortions = files[i].name.split("/")
    attachments.push({
      content: downloadedFiles[i][0].toString('base64'),
      filename:fileNamePortions[fileNamePortions.length - 1]
    })  
  }

  return attachments;
}

// singular email
let sendBlackmailEmail = async (deadline, attachments) => {
  const {recipient, name, sender, dueStamp} = deadline;
  const msg = {
    to: recipient,
    from: 'team@blackmailer.xyz',
    subject: `${sender.split('@')[0]} failed their goal.`,
    html: blackmailEmailString(sender, name, dueStamp.toDate()),
    attachments: attachments,
  };
  console.log("about to send blackmail to " + recipient);
  return sgMail.send(msg);
}

// singular email
let sendReminderEmail = (deadline) => {
  const {name, sender, dueStamp} = deadline;
  const msg = {
    to: sender,
    from: 'team@blackmailer.xyz',
    subject: `Your goal of ${name} is due tomorrow`,
    html: reminderEmailString(sender, name, dueStamp.toDate()),
  };
  console.log("about to send reminder " + sender);
  return sgMail.send(msg);
}

// singular email
let sendApprovalEmail = (deadline) => {
  const {name, sender, dueStamp, status} = deadline;

  const msg = {
    to: sender,
    from: 'team@blackmailer.xyz',
  };

  if(status === "Approved"){
    msg.subject = `Your proof for your goal ${name} was approved`;
    msg.html = approvedEmailString(sender, name);
  } 
  else if(status === "Rejected"){
    msg.subject = `Your proof for your goal ${name} was rejected`;
    msg.html = rejectedEmailString(sender, name, dueStamp.toDate());
  }
  else{
    return undefined;
  }
  console.log("about to send approval email to " + sender + " with status " + status);
  return sgMail.send(msg);
}

// Do it one at a time so we don't run out of ram, who cares if its slow
let downloadAndSend = async (deadlines) => {  
  for (let i = 0; i < deadlines.length; i++) {
    const deadline = deadlines[i];
    // eslint-disable-next-line no-await-in-loop
    attachments = await grabBlackmail(deadline);
    // eslint-disable-next-line no-await-in-loop
    await sendBlackmailEmail(deadline, attachments);
  }
}

let blackmailedStatus = async (deadlines) => {
  const promises = [];
  deadlines.forEach((deadline) => {
    const {uid, did, expiringId} = deadline;
    promises.push(db.collection('users').doc(uid).collection('deadlines').doc(did).update({status:"Blackmailed"}));
    promises.push(db.collection('expiring').doc(expiringId).delete());
  });
  await Promise.all(promises);
}

let updateReminderEmailStatus = async (deadlines) => {
  const promises = [];
  deadlines.forEach((deadline) => {
    const {expiringId} = deadline;
    promises.push(db.collection('expiring').doc(expiringId).update({needsReminderEmail:false}));
  });
  await Promise.all(promises);
}

let deleteStorageObjects = async (deadlines) => {
  const promises = [];
  deadlines.forEach((deadline) => {
    const {uid, did} = deadline;
    const path = [uid, did].join('/');
    promises.push(bucket.deleteFiles({prefix:path}));
  });

  await Promise.all(promises);
}



// For actually running on schedule
exports.autoSend = functions.runWith(runtimeOpts).pubsub.schedule('*/5 * * * *').onRun(async () => {
  const deadlines = await grabPassedDeadlines();
  await downloadAndSend(deadlines);
  await blackmailedStatus(deadlines);
  await deleteStorageObjects(deadlines);
});

exports.reminderEmail = functions.runWith(runtimeOpts).pubsub.schedule('0 */2 * * *').onRun(async () => {
  const deadlines = await grabReminderDeadlines();
  const emailPromises = [];
  deadlines.forEach((deadline) => {
    emailPromises.push(sendReminderEmail(deadline));
  })
  await Promise.all(emailPromises);
  await updateReminderEmailStatus(deadlines);
});

exports.notifyOnApproval = functions.firestore.document('users/{uid}/deadlines/{did}').onUpdate(async (change) => {
  if(change.before.data().status === "Pending"){
    await sendApprovalEmail(change.after.data());
  }
});


// For debugging

exports.manualSendReminder = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
  const deadlines = await grabReminderDeadlines();
  const emailPromises = [];
  deadlines.forEach((deadline) => {
    emailPromises.push(sendReminderEmail(deadline));
  })
  await Promise.all(emailPromises);
  await updateReminderEmailStatus(deadlines);
  res.send("ok");
});


exports.manualSendDeadline = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
  const deadlines = await grabPassedDeadlines();
  await downloadAndSend(deadlines);
  await blackmailedStatus(deadlines);
  await deleteStorageObjects(deadlines);
  res.send("ok");
});

// // // truly really for debugging, don't deploy with this
// exports.addFakeData = functions.https.onRequest(async (req, res) => {

//   const date = new Date();
//   const did = "C7OSG8VLWHyW55Jjq3HZ";
//   const did2 = "Ai7XCK6uKdvHjQg6hGSx2";
//   const uid = "EmkrprpSqrco4mfzBtGBE6GnDB62";
//   const sender = "cyficowley@gmail.com";

//   // const f1 = await fs.readFileSync('./.gitignore')
//   // console.log(f1);
//   // console.log(f1.name);
//   // const uploadPath = [uid, did, 'blackmail', './.gitignore'].join('/');
//   // await storage.upload('./.gitignore', {destination:uploadPath});

//   await db.collection('expiring').add({
//     date:date,
//     did:did,
//     uid:uid,
//     needsReminderEmail:true,
//   })
//   const date2 = new Date();
//   date2.setDate(date.getDate() + 1);
//   console.log(date2);
//   console.log(date);

//   await db.collection('expiring').add({
//     date:date2,
//     did:did2,
//     uid:uid,
//     needsReminderEmail:true,
//   })

//   await db.collection('users').doc(uid).collection('deadlines').doc(did).set({
//     name:"yeeeet",
//     recipient:"cyficowley@gmail.com",
//     status:'unfinished',
//     sender:sender,
//     dueStamp:date,
//   })

//   await db.collection('users').doc(uid).collection('deadlines').doc(did2).set({
//     name:"yeeeet2",
//     recipient:"cyficowley@gmail.com",
//     status:'unfinished',
//     sender:sender,
//     dueStamp:date,
//     needsReminderEmail:true,
//   })

//   const result = await db.collection('expiring').get();
//   result.forEach(yeet => {
//     console.log(yeet.data());
//   })
//   res.send("ok");
// });

// exports.wtf = functions.https.onRequest(async (req, res) => {
//   // const did = "Ai7XCK6uKdvHjQg6hGSx";
//   // const did2 = "Ai7XCK6uKdvHjQg6hGSx2";
//   const uid = "EmkrprpSqrco4mfzBtGBE6GnDB62";
  
//   const result = await db.collection('expiring').get();
//   result.forEach(yeet => {
//     console.log(yeet.data());
//   })
//   console.log("users");
//   const yiken = await db.collection('users').doc(uid).collection('deadlines').get();
//   yiken.forEach(yeet => {
//     console.log(yeet.data());
//   })
//   res.send("ok");
// });

// exports.setPending = functions.https.onRequest(async (req, res) => {
//   const did = "Ai7XCK6uKdvHjQg6hGSx";
//   // const did2 = "Ai7XCK6uKdvHjQg6hGSx2";
//   const uid = "EmkrprpSqrco4mfzBtGBE6GnDB62";
//   console.log("users");
//   const yiken = await db.collection('users').doc(uid).collection('deadlines').doc('did').update({
//     status:"Pending"
//   });
//   res.send("ok");
// });
// exports.setApproved = functions.https.onRequest(async (req, res) => {
//   const did = "Ai7XCK6uKdvHjQg6hGSx";
//   // const did2 = "Ai7XCK6uKdvHjQg6hGSx2";
//   const uid = "EmkrprpSqrco4mfzBtGBE6GnDB62";
//   console.log("users");
//   const yiken = await db.collection('users').doc(uid).collection('deadlines').doc('did').update({
//     status:"Approved"
//   });
//   res.send("ok");
// });