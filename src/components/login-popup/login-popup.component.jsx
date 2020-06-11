import React from 'react';
import {withRouter} from 'react-router-dom';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';
import './login-popup.styles.scss';

export const LoginPopup = ({match}) => {
    return(
        <div className='popup' id='loginPopup'>
            <div className='popup-content'>
                <a className='popupClose' href='#top'>&times;</a>
                <div className="form login">
                    <SignIn />
                </div>
                <div className="form register">                    
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginPopup);