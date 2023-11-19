// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6v311zs2LKTaYDJylmN8-FOIpLhP8bTA",
    authDomain: "mcu-binger.firebaseapp.com",
    databaseURL: "https://mcu-binger-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mcu-binger",
    storageBucket: "mcu-binger.appspot.com",
    messagingSenderId: "1021808144031",
    appId: "1:1021808144031:web:527bce95a8cd4714c03caa",
    measurementId: "G-K23KX1J2SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getDatabase(app);