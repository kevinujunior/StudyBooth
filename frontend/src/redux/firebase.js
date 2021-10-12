// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/firestore';


firebase.initializeApp({
    apiKey: "AIzaSyDRxd4tgCn3sfWdHtSxb4uUx3sXyxyVC7g",
    authDomain: "facebook-clone-24cca.firebaseapp.com",
    databaseURL: "https://facebook-clone-24cca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "facebook-clone-24cca",
    storageBucket: "facebook-clone-24cca.appspot.com",
    messagingSenderId: "851415531631",
    appId: "1:851415531631:web:beb6fcad66b2bfed75cd9a",
    measurementId: "G-WQDR75858M"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider}
  export default db;