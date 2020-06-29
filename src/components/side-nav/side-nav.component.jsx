import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';
import { toggleSignInSignUp } from '../../redux/modal/modal.actions';

import { ReactComponent as HomeSvg } from '../../svgicon/home.svg';
import { ReactComponent as EventSvg } from '../../svgicon/server.svg';
import { ReactComponent as AboutSvg } from '../../svgicon/info.svg';
import { ReactComponent as UserSvg } from '../../svgicon/user.svg';
import { ReactComponent as LogoSvg } from '../../svgicon/KooraLogoWeb.svg';
import './side-nav.styles.scss';


const SideNav = ({ modalState, toggleSignInSignOutState, currentUser }) =>{
    
    return (
        <nav className='side-nav'>
            <div className='logo'>
                <NavLink to='/'><LogoSvg/></NavLink>
            </div>
            <ul className="side-list">
                <li className="nav-item">
                    <NavLink exact activeClassName='active-link' to="/" className='nav-link'>
                        <HomeSvg className='svg-icon' />
                        <span>Home</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink activeClassName='active-link'  to="/events" className='nav-link'>
                        <EventSvg className='svg-icon' />
                        <span>Events</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName='active-link' to="/about" className='nav-link'>
                        <AboutSvg className='svg-icon' />
                        <span>About</span>
                    </NavLink>
                </li>
            </ul>            
            
            {
                currentUser && currentUser ? (
                    <div className="user"> 
                        <NavLink activeClassName='active-link' className='nav-link' to='/profile'>
                            <UserSvg className='svg-icon' />
                            <span> {currentUser.email}</span>
                        </NavLink>
                    </div>
                    ) 
                : 
                    (<div className='user' onClick={() => { toggleSignInSignOutState(); }}>
                        <UserSvg className='svg-icon' />
                        <span>Login</span>
                    </div>)
            }

            <div className="legal">
                &copy; {new Date().getFullYear()} by Davies Esiro. All rights reserved.
            </div>
        </nav>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    toggleSignInSignOutState: () => dispatch(toggleSignInSignUp())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);