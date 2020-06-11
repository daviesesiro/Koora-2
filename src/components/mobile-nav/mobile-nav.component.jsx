import React from 'react';

import { Link } from 'react-router-dom';
import { ReactComponent as HomeSvg } from '../../svgicon/home.svg';
import { ReactComponent as EventSvg } from '../../svgicon/server.svg';
import { ReactComponent as PlaceSvg } from '../../svgicon/map.svg';
import { ReactComponent as AboutSvg } from '../../svgicon/info.svg';
import { ReactComponent as UserSvg } from '../../svgicon/user.svg';

import './mobile-nav.styles.scss';

const BottomNav = () => (
    <div className='mobile-nav'>
        <div className='nav top-nav'>
            <p>Koora</p>           
            <a className='user-pop' href="#loginPopup">
                <UserSvg className='svg-icon' />
                <p>Sign in</p>
            </a>
        </div>
        <div className='nav bottom-nav'>
            <Link to='/'><HomeSvg /></Link> 
            <Link to='/events'><EventSvg /></Link> 
            <Link to='/place'><PlaceSvg /></Link> 
            <Link to='/about'><AboutSvg /></Link> 
        </div>
        
    </div>
);

export default BottomNav;