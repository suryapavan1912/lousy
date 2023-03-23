import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPzzGeM5y9Vz7p0IoooFfmA3P7jbIDVJE",
  authDomain: "lousy-d1b70.firebaseapp.com",
  projectId: "lousy-d1b70",
  storageBucket: "lousy-d1b70.appspot.com",
  messagingSenderId: "481786537426",
  appId: "1:481786537426:web:62bbe323bd95a58998540b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default db;
export { auth };