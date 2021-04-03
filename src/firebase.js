import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDI4KIUot89vqqDK-PuLzrXPVqQAtNswDM",
    authDomain: "book-app-test-70813.firebaseapp.com",
    projectId: "book-app-test-70813",
    storageBucket: "book-app-test-70813.appspot.com",
    messagingSenderId: "538024152938",
    appId: "1:538024152938:web:e47af86551f256553a1f13",
    measurementId: "G-CBF3762XLV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const storage = firebaseApp.storage();
const storageRef = storage.ref();
const auth = firebaseApp.auth();

export {storage, storageRef,auth}

export default db;


