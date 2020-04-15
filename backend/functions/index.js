const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

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


let sendEmails = async (deadlines) => {
  deadline = deadlines[0]
  deadlines.forEach(async (deadline) => {
    const {recipient, name} = deadline;
    const msg = {
      to: recipient,
      from: 'ccowley@ucsd.edu',
      subject: `Someone failed their goal of ${name} and wanted you to see this`,
      text: 'They never uploaded their proof to blackmail.io so you now get to see this',
    };
    console.log("about to send msg");
    console.log(msg);
    sgMail.send(msg);
  })
}

let updateEntries = async (deadlines) => {
  const promises = [];
  deadlines.forEach((deadline) => {
    const {uid, did, expiringId} = deadline;
    promises.push(db.collection('users').doc(uid).collection('deadlines').doc(did).update({status:"Sent"}));
    promises.push(db.collection('expiring').doc(expiringId).delete());
  });
  await Promise.all(promises);
}


// For actually running on schedule
exports.autoSend = functions.pubsub.schedule('0 */2 * * *').onRun(async () => {
  const deadlines = await grabPassedDeadlines();
  sendEmails(deadlines);
  updateEntries(deadlines);
});

// For debugging
exports.manualSend = functions.https.onRequest(async (req, res) => {
  const deadlines = await grabPassedDeadlines();
  sendEmails(deadlines);
  updateEntries(deadlines);
  res.send("ok");
});



// truly really for debugging, don't deploy with this
// exports.addFakeData = functions.https.onRequest(async (req, res) => {

//   const date = new Date();
//   const did = "Ai7XCK6uKdvHjQg6hGSx";
//   const did2 = "Ai7XCK6uKdvHjQg6hGSx2";
//   const uid = "EmkrprpSqrco4mfzBtGBE6GnDB62";

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
//     recipient:"footballshane@gmail.com",
//     status:'unfinished'
//   })

//   await db.collection('users').doc(uid).collection('deadlines').doc(did2).set({
//     name:"yeeeet2",
//     recipient:"footballshane@gmail.com",
//     status:'unfinished'
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