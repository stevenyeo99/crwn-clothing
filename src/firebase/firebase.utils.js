import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD2eSkDuVqNIbqVK11S5FnyuIwMg02vdyA",
    authDomain: "crwn-db-48fd4.firebaseapp.com",
    projectId: "crwn-db-48fd4",
    storageBucket: "crwn-db-48fd4.appspot.com",
    messagingSenderId: "414141351231",
    appId: "1:414141351231:web:fbd18ac42cf3b356e67f8a",
    measurementId: "G-C1Z4H60E63"
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
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;