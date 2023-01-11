import { useState } from 'react';
import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = (props) => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;