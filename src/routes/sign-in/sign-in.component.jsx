import React from 'react';
import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = (props) => {
    const signInWithGoogleHandler = async () => {
        const response = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };
    
    return (
        <React.Fragment>
            <h1>Sign In Page</h1>
            <button onClick={signInWithGoogleHandler}>Sign In Google</button>
        </React.Fragment>
    );
};

export default SignIn;