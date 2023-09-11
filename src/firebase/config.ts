import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_P_ID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_S_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { db, app, auth, provider }
