import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFemNj88TT5qth40VFY6pybmN6B6xQbvg",
    authDomain: "adopte-un-guide.firebaseapp.com",
    databaseURL: "https://adopte-un-guide-default-rtdb.firebaseio.com",
    projectId: "adopte-un-guide",
    storageBucket: "adopte-un-guide.appspot.com",
    messagingSenderId: "593470950959",
    appId: "1:593470950959:web:dbf2210fbed26a232980da",
    measurementId: "G-C7TSYMYZ8T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;