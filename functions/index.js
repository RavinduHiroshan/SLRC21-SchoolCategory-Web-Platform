const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const Storage = require('@google-cloud/storage');





exports.submission = functions.storage.object().onFinalize(event=>{
  const time = event.timeCreated;
  const uid = event.metadata.uid;
  const link = event.getDownloadURL;
  const task = event.metadata.task;
  const team = event.metadata.team;
  const db = admin.firestore();
  const docRef = db.collection('Users').doc(`${team}/Submission/${task}`);
  const getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return admin.firestore().collection('Users').doc(`${team}/Submission/${task}`).set({
          time: time,
          link: link,
          task: task,
          attempt: 0
        });
      } 
        return admin.firestore().collection('Users').doc(`${team}/Submission/${task}`).set({
          time: time,
          link: link,
          task: task,
          attempt: doc.data().attempt+1
        });
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});
 


exports.downloads = functions.https.onCall((data, contex) => {
  const storage = admin.storage();
  return new Promise((resolve, reject) => {
   storage.bucket().file('Submission/Bymhw8vttmaidBhc7tIo5GP66Tc2/easy/clique wording-2.png');
    httpsReference.getDownloadURL().then(doc => {
    resolve(doc);
    }).catch(reason => {
      console.log('db.collection("colors").get gets err, reason: ' + reason);
      reject(reason);
  });
  })
    
});

exports.fireGetColors= functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
      var taskDetails = {};
      var db = admin.firestore();
      db.collection('Task').doc('task')
        .get()
        .then(snapshot => {
          const lock = snapshot.data().lock;
          if (lock) {
            resolve({tsk:"lock"});          
          } else {
            resolve(snapshot.data());
          }
            
        })
        .catch(reason => {
            console.log('db.collection("colors").get gets err, reason: ' + reason);
            reject(reason);
        });
  });

});



exports.getUrl = functions.https.onCall(async (data, context) => {
    const storage = new Storage();
    // options of temporary access to file
    const options = {
        version: 'v2',
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // expire date, one minute from now
    };
    // get a V2 signed URL for the file
    const [url] = await storage
        .bucket() // name of the storage bucket
        .file('Submission/Bymhw8vttmaidBhc7tIo5GP66Tc2/easy/clique wording-2.png') // path of the file inside the bucket
        .getSignedUrl(options); // returns a promise
  return url;
});


// new Promise((resolve, reject) => {
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   xhr.send();
//   })
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   let a = xhr.send();
//   resolve(a)

