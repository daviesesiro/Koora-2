import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
            <NavLink exact activeClassName='active-nav' to='/' className='logo'><p>Koora</p></NavLink>           
            <div className='user-pop'>
                <NavLink to='/about'><AboutSvg className='svg-icon' /></NavLink>               
            </div>
        </div>
        <div className='nav bottom-nav'>
            <NavLink exact activeClassName='active-nav' className='logoSvg' to='/'><HomeSvg /></NavLink> 
            <NavLink exact activeClassName='active-nav' className='logoSvg' to='/events'><EventSvg /></NavLink> 
            <NavLink exact activeClassName='active-nav' className='logoSvg' to='/place'><PlaceSvg /></NavLink> 
            {                
                !currentUser ?
                    <UserSvg activeClassName='active-nav' className='logoSvg' onClick={() => toggleLoginPopUp()}/>
                    :
                    <NavLink exact activeClassName='active-nav' className='logoSvg' to='/profile'><UserSvg /></NavLink>
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