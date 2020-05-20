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


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        )
      } catch (error){
        console.log(error.message);
      }


    }

    return userRef;

  }

  firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;