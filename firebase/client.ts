// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAAbAPMjBi8fdeIe5rJpiyp8WR2RFPG9xk",
  authDomain: "prepify-cc0c6.firebaseapp.com",
  projectId: "prepify-cc0c6",
  storageBucket: "prepify-cc0c6.firebasestorage.app",
  messagingSenderId: "1018548183825",
  appId: "1:1018548183825:web:f18db623c510aded5862b0",
  measurementId: "G-Z3S8PR3R6E"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db =getFirestore(app);