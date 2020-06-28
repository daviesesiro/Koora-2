import React, { useState } from 'react';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import './SignIn-SignUp.styles.scss';
import { Modal } from '../modal/modal.component';

export const SignInSignUp = ({ state, toggle}) => {
    const [isOnLoginForm, setIsOnLoginForm] = useState(true);

    const switchForm = () => {
        setIsOnLoginForm(!isOnLoginForm);
    }
    return (
        <Modal
            modalState={state}
            toggleModal={toggle}
        >
            {
                isOnLoginForm
                    ? <SignIn />
                    : <SignUp />
            }
            <p onClick={() => switchForm()}
                className='switch'>Switch to {isOnLoginForm ? `Registration Form` : `Login Form`}
            </p>
        </Modal>
    )
}

export default SignInSignUp;