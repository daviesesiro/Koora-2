import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.styles.scss'

const SignIn = () => {
    const [userCredientials, setCredentials] = useState({
        email:'', 
        password: ''
    });

    const {email, password} = userCredientials;

    const handleSubmit = async event => {
        event.preventDefault();
    };

    const handleChange = event => {
        const {value, name} = event.target;

        setCredentials({...userCredientials, [name]:value});
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
            </div>
    );
    
}

export default SignIn;