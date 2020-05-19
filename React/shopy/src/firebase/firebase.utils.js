import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBLdbTpyn0msQ9YznhtgqhC2Q54fuAlPjQ",
    authDomain: "shopy-87dde.firebaseapp.com",
    databaseURL: "https://shopy-87dde.firebaseio.com",
    projectId: "shopy-87dde",
    storageBucket: "shopy-87dde.appspot.com",
    messagingSenderId: "621769581949",
    appId: "1:621769581949:web:b419b119b757ae58da1814",
    measurementId: "G-VQCKV8X8GV"
  }


  firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;