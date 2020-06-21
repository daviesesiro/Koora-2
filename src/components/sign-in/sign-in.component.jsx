import React, {useState} from 'react';

import {auth} from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.styles.scss'

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({
        email:'', 
        password: '',
        error: ''
    });

    const {email, password} = userCredentials;

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
        <div className='signin'>
            <h2>I already have an account</h2>
            <h4>Sign in with your email and password</h4>
                <form onSubmit={handleSubmit}>
                    <FormInput className='form-control'
                        type="email" 
                        value={email} 
                        name="email" 
                        label='Email'
                        required 
                        handleChange={handleChange}
                    />
                    
                    <FormInput className='form-control'
                        type="password" 
                        value={password} 
                        name="password"
                        label='Password'
                        required 
                        handleChange={handleChange}
                    />      
                    <div className='button-container'>
                        <Button>Sign In</Button>
                        <Button>Google sign in</Button>
                    </div>
                </form>
                <p style={{ color:'rgb(100,0,0)' }}>{userCredentials.error}</p>
            </div>
    );
    
}

export default SignIn;