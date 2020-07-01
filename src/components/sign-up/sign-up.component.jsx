import React, {useState} from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsSignUpBtnDisabled, selectErrorMessage } from '../../redux/user/user.selector';
import { signUpUserAsync } from '../../redux/user/user.async';

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import './sign-up.styles.scss'

const SignUp = ({signUpUserAsync, errorMessag, isSignUpBtnDisabled}) => {   
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password: '',
        confirmPassword: ''
    });
    
    const {email, password, confirmPassword} = userCredentials;

    const handleSubmit = event =>{
        event.preventDefault();
        signUpUserAsync(email, password, confirmPassword);       
    }

    const handleChange = event =>{
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]:value});
    }

    return(
        <>
            <h2 className="sign-up-title">I do not have a account</h2>
            <h4 className='sign-up-subhead'>Sign up with your email and password</h4>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <p
                    style={{
                        color: 'rgb(100,0,0)',
                        textAlign: 'center'
                    }}
                >
                    {errorMessag}
                </p>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange = {handleChange}
                    label="Email"
                    required
                />  
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange = {handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange = {handleChange}
                    label="Confirm Password"
                    required
                />
                <Button2 disabled={isSignUpBtnDisabled} size='big1' color='red' type='submit'>
                    {!isSignUpBtnDisabled ? 'SIGN UP' : 'SIGNING UP'}
                </Button2> 
            </form>
            
        </>
    )
}
const mapState = createStructuredSelector({
    isSignUpBtnDisabled: selectIsSignUpBtnDisabled,
    errorMessag: selectErrorMessage
})

const mapDispatch = dispatch => ({
    signUpUserAsync: (email, password, confirmPassword) => dispatch(signUpUserAsync(email, password, confirmPassword))
})
export default connect(mapState, mapDispatch)(SignUp);