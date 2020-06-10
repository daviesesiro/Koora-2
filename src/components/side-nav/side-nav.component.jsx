import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { ReactComponent as HomeSvg } from '../../svgicon/home.svg';
import { ReactComponent as EventSvg } from '../../svgicon/server.svg';
import { ReactComponent as PlaceSvg } from '../../svgicon/map.svg';
import { ReactComponent as AboutSvg } from '../../svgicon/info.svg';
import { ReactComponent as UserSvg } from '../../svgicon/user.svg';
import { ReactComponent as LogoSvg } from '../../svgicon/KooraLogoWeb.svg';
import './side-nav.styles.scss';

const SideNav = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <nav className='side-nav'>
            <div className='logo'>
                <LogoSvg/>
            </div>
            <ul className="side-list">
                <li className="nav-item">
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

            <div className="user">
                <UserSvg className='svg-icon'/>
            </div>

            <div className="legal">
                &copy; {new Date().getFullYear()} by Davies Esiro. All rights reserved.
            </div>
        </nav>
    );
}

export default SideNav;