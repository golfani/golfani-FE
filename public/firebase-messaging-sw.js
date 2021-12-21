// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCslF4Q0fxcHKw0Gibc5v0fP4qb9zrs5BQ",
    authDomain: "golfani.firebaseapp.com",
    projectId: "golfani",
    storageBucket: "golfani.appspot.com",
    messagingSenderId: "754644573375",
    appId: "1:754644573375:web:92b8afc4bd06032777ba0a",
    measurementId: "G-SXKEJV1VYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging();