import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    /** CLEM **/
    // apiKey: "AIzaSyCFemNj88TT5qth40VFY6pybmN6B6xQbvg",
    // authDomain: "adopte-un-guide.firebaseapp.com",
    // databaseURL: "https://adopte-un-guide-default-rtdb.firebaseio.com",
    // projectId: "adopte-un-guide",
    // storageBucket: "adopte-un-guide.appspot.com",
    // messagingSenderId: "593470950959",
    // appId: "1:593470950959:web:dbf2210fbed26a232980da",
    // measurementId: "G-C7TSYMYZ8T"

    /** BRYAN **/
    apiKey: "AIzaSyDDb5Q2wFt4oIU1DrBE1Orkgcc_IPm0aDU",
    authDomain: "adopteunguide-822a2.firebaseapp.com",
    projectId: "adopteunguide-822a2",
    storageBucket: "adopteunguide-822a2.appspot.com",
    messagingSenderId: "23998263914",
    appId: "1:23998263914:web:64e92e5cf423a222629013",
    measurementId: "G-YST04BDRFX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;