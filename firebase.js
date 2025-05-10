// src/firebase.js

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' // ✅ Import Firestore
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnPz24awtKVmLhkZcW1LqAOIw1cfkWD8Y",
  authDomain: "emonitoring-f00f5.firebaseapp.com",
  projectId: "emonitoring-f00f5",
  storageBucket: "emonitoring-f00f5.appspot.com",
  messagingSenderId: "833347309999",
  appId: "1:833347309999:web:5edfa5c56c039ada509f5a",
  measurementId: "G-4BN0X59Z0Q"
}

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig)

// ✅ Init services
const auth = getAuth(app)
const db = getFirestore(app) // ✅ Firestore instance

const googleProvider = new GoogleAuthProvider()

// ✅ Export everything
export {
  auth,
  db, // ✅ make sure this is exported!
  googleProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup
}
