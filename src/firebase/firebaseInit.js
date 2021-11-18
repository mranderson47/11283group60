import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBZxIJdA8Q63bZCbt-2l8x1ro_RPbOzQMw",
    authDomain: "beach-avengers.firebaseapp.com",
    projectId: "beach-avengers",
    storageBucket: "beach-avengers.appspot.com",
    messagingSenderId: "749348432392",
    appId: "1:749348432392:web:af66244df09b0276677fbd",
    measurementId: "G-DPD7V90JFR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { timestamp };
export default firebaseApp.firestore();

