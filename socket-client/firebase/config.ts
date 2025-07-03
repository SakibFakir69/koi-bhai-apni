

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsfr8UTqS0ED93FB5w4by2yrWHJCMjHzQ",
  authDomain: "koi-bha-apni.firebaseapp.com",
  projectId: "koi-bha-apni",
  storageBucket: "koi-bha-apni.firebasestorage.app",
  messagingSenderId: "62891067172",
  appId: "1:62891067172:web:bca635bf1c2670e26d15b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const Auth = getAuth(app);




