import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);

                await createUserDocumentFromAuth(user, { displayName });

                resetFormFields();
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in used.');
                } else {
                    console.log('Error message ', error.message);
                }
            }
            
        } else {
            alert('Password do not match');
            return;
        }
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandler}>
                <FormInput 
                    label='Display Name' 
                    type='text' 
                    name='displayName' 
                    value={displayName} 
                    onChange={changeHandler} 
                    required 
                />

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

                <FormInput 
                    label='Confirm Password' 
                    type='password' 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    onChange={changeHandler} 
                    required 
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;