// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJQzUqpxadbnTzaODatpAvEts-t3bHusc",
    authDomain: "ccc-program.firebaseapp.com",
    projectId: "ccc-program",
    storageBucket: "ccc-program.appspot.com",
    messagingSenderId: "982888182024",
    appId: "1:982888182024:web:dae499c8785d448bac7cbd",
    measurementId: "G-K4TNYZ9QSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getStorage } from 'firebase/storage';
const storage = getStorage(app);

export {storage}