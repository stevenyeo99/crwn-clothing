import { useState } from 'react';

import { signInWithGooglePopUp, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = (props) => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password } = formField;

    const logGoogleUser = async () => {
        await signInWithGooglePopUp();
    };

    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Invalid email or password.');
                    break;
                case 'auth/user-not-found':
                    alert('User not found.');
                    break;
                default:
                    console.log(error.message);
            }
        }
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormField((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={loginHandler}>
                <FormInput 
                    label='Email' 
                    type='email' 
                    name='email' 
                    value={email} 
                    onChange={changeHandler} 
                    required 
                />

                <FormInput 
                    label='Password' 
                    type='password' 
                    name='password' 
                    value={password} 
                    onChange={changeHandler} 
                    required 
                />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;