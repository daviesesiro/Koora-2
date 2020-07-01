import React, {useState} from 'react';
import { connect } from 'react-redux';

import { signInUserAsync } from '../../redux/user/user.async';

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import './sign-in.styles.scss'
// import Spinner from '../spinner/spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectIsSignInBtnDisabled, selectErrorMessage } from '../../redux/user/user.selector';

const SignIn = ({signInUserAsync,errorMessage,isSignInBtnDisabled}) => {
    const [userCredentials, setCredentials] = useState({
        email:'', 
        password: '',
        error: ''
    });

    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        signInUserAsync(email, password)
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
                <p style={{ color:'rgb(100,0,0)' }}>{errorMessage}</p>
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
                    <Button2 disabled={isSignInBtnDisabled} size='big2' color='blue'>
                        {!isSignInBtnDisabled ? 'Sign In' : 'Signing...'}
                    </Button2>
                    <Button2 size='big2' color='blue-g'>Google sign in</Button2>
                </div>
            </form>
        </>
    );
    
}
const mapDispatch = (dispatch) => ({
    signInUserAsync: (email, password) => dispatch(signInUserAsync(email, password)),
})

const mapState = createStructuredSelector({
    isSignInBtnDisabled: selectIsSignInBtnDisabled,
    errorMessage: selectErrorMessage
})
export default connect(mapState, mapDispatch)(SignIn);