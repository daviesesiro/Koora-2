import React, {useState} from 'react';

import {auth} from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button1 from '../button/button1.component';

import './sign-in.styles.scss'

const SignIn = ({switchForm}) => {
    const [userCredentials, setCredentials] = useState({
        email:'', 
        password: '',
        error: ''
    });

    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            setCredentials({...userCredentials, error: error.message });
        }
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]:value});
    };

    return (
        <>
            <h2 className='signin-title'>I already have an account</h2>
            <h4 className='signin-subhead'>Sign in with your email and password</h4>
            <form onSubmit={handleSubmit}>
                <p style={{ color:'rgb(100,0,0)' }}>{userCredentials.error}</p>
                <FormInput
                    type="email" 
                    value={email} 
                    name="email" 
                    label='Email'
                    required 
                    handleChange={handleChange}
                />                
                <FormInput
                    type="password" 
                    value={password} 
                    name="password"
                    label='Password'
                    required 
                    handleChange={handleChange}
                />      
                <div className='button-container'>
                    <Button1>Sign In</Button1>
                    <Button1>Google sign in</Button1>
                </div>
            </form>
        </>
    );
    
}

export default SignIn;