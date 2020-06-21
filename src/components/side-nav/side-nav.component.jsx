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
import { ReactComponent as LogoSvg } from '../../svgicon/KooraLogoWeb.svg';
import './side-nav.styles.scss';


const SideNav = ({ loginPopState, toggleLoginPopUp, currentUser }) =>{
    
    return (
        <nav className='side-nav'>
            {
                (loginPopState) ? <LoginPopup/> : null
            }            
            <div className='logo'>
                <Link to='/'><LogoSvg/></Link>
            </div>
            <ul className="side-list">
                <li className="nav-item nav-item--active">
                    <Link to="/" className='nav-link'>
                        <HomeSvg className='svg-icon' />
                        <span>Home</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/events" className='nav-link'>
                        <EventSvg className='svg-icon' />
                        <span>Events</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/place" className='nav-link'>
                        <PlaceSvg className='svg-icon' />
                        <span>Place</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/about" className='nav-link'>
                        <AboutSvg className='svg-icon' />
                        <span>About</span>
                    </Link>
                </li>
            </ul>            
            
            {
                
                currentUser ? (
                    <div className="user"> 
                        <Link className='nav-link' to='/profile'>
                            <UserSvg className='svg-icon' />
                            <span> {currentUser.email}</span>
                        </Link>
                    </div>
                    ) 
                    : 
                        (<div className='user' onClick={() => { toggleLoginPopUp(); console.log('clicked') }}>
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
    loginPopState: selectPop,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    toggleLoginPopUp: () => dispatch(showPop())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);