const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const serviceAccount = require("./.serviceAccountKey.json");
const admin = require('firebase-admin');
const {emailString} = require("./emailTemplate");

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

// singular deadline
let grabBlackmail = async (deadline) => {
  console.log("grabbing");
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

  console.log("finished grabbing");
  return attachments;
}

// singular email
let sendEmail = async (deadline, attachments) => {
  const {recipient, name, sender, dueStamp} = deadline;
  const msg = {
    to: recipient,
    from: 'team@blackmailer.xyz',
    subject: `${sender.split('@')[0]} failed their goal.`,
    html: emailString(sender, name, dueStamp.toDate()),
    attachments: attachments,
  };
  console.log("about to send msg");
  return sgMail.send(msg);
}

// Do it one at a time so we don't run out of ram, who cares if its slow
let downloadAndSend = async (deadlines) => {  
  for (let i = 0; i < deadlines.length; i++) {
    const deadline = deadlines[i];
    // eslint-disable-next-line no-await-in-loop
    attachments = await grabBlackmail(deadline);
    // eslint-disable-next-line no-await-in-loop
    await sendEmail(deadline, attachments);
  }
}

let updateEntries = async (deadlines) => {
  const promises = [];
  deadlines.forEach((deadline) => {
    const {uid, did, expiringId} = deadline;
    promises.push(db.collection('users').doc(uid).collection('deadlines').doc(did).update({status:"Blackmailed"}));
    promises.push(db.collection('expiring').doc(expiringId).delete());
  });
  await Promise.all(promises);
}

let deleteStorageObjects = async (deadlines) => {
  console.log("deleting");
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
  await updateEntries(deadlines);
  await deleteStorageObjects(deadlines);
});

// For debugging
// exports.manualSend = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
//   const deadlines = await grabPassedDeadlines();
//   await downloadAndSend(deadlines);
//   await updateEntries(deadlines);
//   await deleteStorageObjects(deadlines);
//   res.send("ok");
// });



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
//   })
//   const date2 = new Date();
//   date2.setDate(date.getDate() + 1);

//   await db.collection('expiring').add({
//     date:date2,
//     did:did2,
//     uid:uid,
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