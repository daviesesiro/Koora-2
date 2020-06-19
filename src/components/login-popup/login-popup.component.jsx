import React from 'react';
import { connect } from 'react-redux';

import { showPop } from '../../redux/user/user.actions';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';
import './login-popup.styles.scss';

export const LoginPopup = ({showPop}) => {
    return(
        <div className='popup'>
            <div className='popup-content'>
                <div className='popup-close' onClick={() => showPop()}>&times;</div>
                <div className="form login">
                    <SignIn showPop={showPop}/>
                </div>
                <div className="form register">                    
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    showPop : () => dispatch(showPop())
})

export default connect(null, mapDispatchToProps)(LoginPopup);