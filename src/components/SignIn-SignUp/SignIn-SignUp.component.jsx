import React from 'react';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import './SignIn-SignUp.styles.scss';

export const SignInSignUp = ({ IsOnLoginForm, switcher }) => {
    // console.log(switchSignInSignOut);
    return (
        <>
            <p onClick={() => switcher()}
                className='switch'>Switch to {IsOnLoginForm ? `Registration Form` : `Login Form`}
            </p>
            {
                IsOnLoginForm
                    ? <SignIn />
                    : <SignUp />
            }
            
        </>
    )
}

export default SignInSignUp;