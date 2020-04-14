import firebase from 'firebase';
import 'firebase/firestore';


// firebase init goes here
const config = {
  apiKey: 'AIzaSyCoUDldvt5ICA3iPRChgtYwofoUMdd80_Q',
  authDomain: 'blackmail-ec269.firebaseapp.com',
  databaseURL: 'https://blackmail-ec269.firebaseio.com',
  projectId: 'blackmail-ec269',
  storageBucket: 'blackmail-ec269.appspot.com',
  messagingSenderId: '988070161319',
  appId: '1:988070161319:web:fe2ffdf3952484670be482',
  measurementId: 'G-EKG5MMFX7G',
};
firebase.initializeApp(config);
firebase.analytics();

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref();
const users = db.collection('users');

export {
  db,
  auth,
  currentUser,
  users,
  provider,
  storage,
};
