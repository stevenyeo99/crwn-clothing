import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDgoR4zPm994Y0QmMAHNlgNlsreuu_vADM",
    authDomain: "crwn-clothing-db-9de27.firebaseapp.com",
    projectId: "crwn-clothing-db-9de27",
    storageBucket: "crwn-clothing-db-9de27.appspot.com",
    messagingSenderId: "682795135300",
    appId: "1:682795135300:web:3664c6a2cdc8198d862711"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        try {
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('Error during save document to firebase, with: ', error.message);
        }
    }

    return userDocRef;
}