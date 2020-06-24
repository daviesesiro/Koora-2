import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { showPop } from '../../redux/user/user.actions';
import { selectPop, selectCurrentUser } from '../../redux/user/user.selector';

import LoginPopup from '../login-popup/login-popup.component';
import { ReactComponent as HomeSvg } from '../../svgicon/home.svg';
import { ReactComponent as EventSvg } from '../../svgicon/server.svg';
import { ReactComponent as PlaceSvg } from '../../svgicon/map.svg';
import { ReactComponent as AboutSvg } from '../../svgicon/info.svg';
import { ReactComponent as UserSvg } from '../../svgicon/user.svg';

import './mobile-nav.styles.scss';

const MobileNav = ({ toggleLoginPopUp, loginPopState, currentUser }) => (
    <div className='mobile-nav'>
        {
            (loginPopState) ? <LoginPopup/> : null
        }
        <div className='nav top-nav'>
            <Link to='/' className='logo'><p>Koora</p></Link>           
            <div className='user-pop'>
                <Link to='/about'><AboutSvg className='svg-icon' /></Link>               
            </div>
        </div>
        <div className='nav bottom-nav'>
            <Link to='/'><HomeSvg /></Link> 
            <Link to='/events'><EventSvg /></Link> 
            <Link to='/place'><PlaceSvg /></Link> 
            {                
                !currentUser ?
                    <UserSvg onClick={() => toggleLoginPopUp()}/>
                    :
                    <Link to='/profile'><UserSvg /></Link>
                }
        </div>
        
    </div>
);

const mapStateToProps = createStructuredSelector({
    loginPopState: selectPop,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    toggleLoginPopUp : () => dispatch(showPop())
})


export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);