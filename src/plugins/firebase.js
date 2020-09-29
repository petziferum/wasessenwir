import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQrUZ44HnkaVksAqUs4G79TiaG1Ejwiw0",
  authDomain: "documentation-dfdb2.firebaseapp.com",
  databaseURL: "https://documentation-dfdb2.firebaseio.com",
  projectId: "documentation-dfdb2",
  storageBucket: "documentation-dfdb2.appspot.com",
  messagingSenderId: "644597680458",
  appId: "1:644597680458:web:b26f46fb441a0a55b799b3",
  measurementId: "G-Y9ZR7M799S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
