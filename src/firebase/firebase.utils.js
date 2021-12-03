import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyB2sAbNEqfLK1Rm5Z-IgbTfkuPKuiHFxro",
  authDomain: "crown-db-80ece.firebaseapp.com",
  projectId: "crown-db-80ece",
  storageBucket: "crown-db-80ece.appspot.com",
  messagingSenderId: "779574762444",
  appId: "1:779574762444:web:9d6be663e9022cc3ce9b69",
  measurementId: "G-SYSJ95KD4J",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
