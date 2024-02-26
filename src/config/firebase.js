// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ksDvc_rEExye5NiXNJrbHFSw92VaTj4",
  authDomain: "swp391-bb0b2.firebaseapp.com",
  projectId: "swp391-bb0b2",
  storageBucket: "swp391-bb0b2.appspot.com",
  messagingSenderId: "526800797430",
  appId: "1:526800797430:web:b7b0cf64859cb0008676d7",
  measurementId: "G-JH332EWBL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
