import firebase from 'firebase'


const firebaseConfig = {

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const storage = firebaseApp.storage();
const storageRef = storage.ref();
const auth = firebaseApp.auth();

export {storage, storageRef,auth}

export default db;


