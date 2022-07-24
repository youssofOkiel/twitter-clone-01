import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC8_OyERWBjIFuZckvYWewI_Ho7AXLy40k",
  authDomain: "test-874ae.firebaseapp.com",
  databaseURL: "https://test-874ae-default-rtdb.firebaseio.com",
  projectId: "test-874ae",
  storageBucket: "test-874ae.appspot.com",
  messagingSenderId: "266766294682",
  appId: "1:266766294682:web:464f5a9d89c264d0b88923",
  measurementId: "G-EQQF2WJDT8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider }

export default db