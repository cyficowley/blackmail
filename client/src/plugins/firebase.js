/* eslint-disable func-names */
import firebase from 'firebase';

require('firebase/firestore');
require('firebase/firebase-auth');
require('firebase/firebase-storage');

const application = {
  apiKey: 'AIzaSyCoUDldvt5ICA3iPRChgtYwofoUMdd80_Q',
  authDomain: 'blackmail-ec269.firebaseapp.com',
  databaseURL: 'https://blackmail-ec269.firebaseio.com',
  projectId: 'blackmail-ec269',
  storageBucket: 'blackmail-ec269.appspot.com',
  messagingSenderId: '988070161319',
  appId: '1:988070161319:web:fe2ffdf3952484670be482',
  measurementId: 'G-EKG5MMFX7G',
};

function Firebase() {
}

Firebase.ready = false;

Firebase.init = function (config) {
  if (Firebase.ready) return;
  firebase.initializeApp(config);
  firebase.analytics();
  Firebase.ready = true;
};

Firebase.db = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return firebase.firestore();
};

Firebase.users = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return firebase.firestore().collection('users');
};

Firebase.auth = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return firebase.auth();
};

Firebase.currentUser = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return firebase.auth().currentUser;
};

Firebase.provider = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return new firebase.auth.GoogleAuthProvider();
};

Firebase.storage = function () {
  if (!Firebase.ready) {
    Firebase.init(application);
  }
  return firebase.storage().ref();
};

Firebase.prototype = {
};

export default Firebase;
