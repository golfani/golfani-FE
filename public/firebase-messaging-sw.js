importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCslF4Q0fxcHKw0Gibc5v0fP4qb9zrs5BQ",
    authDomain: "golfani.firebaseapp.com",
    projectId: "golfani",
    storageBucket: "golfani.appspot.com",
    messagingSenderId: "754644573375",
    appId: "1:754644573375:web:92b8afc4bd06032777ba0a",
    measurementId: "G-SXKEJV1VYX"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);