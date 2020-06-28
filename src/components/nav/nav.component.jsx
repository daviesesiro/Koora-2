import React from 'react'
import SideNav from '../side-nav/side-nav.component';
import MobileNav from '../mobile-nav/mobile-nav.component';
export const Nav = () => {
    return (
        <div>
            <SideNav/>
            <MobileNav/>
        </div>
    )
}
export default Nav;