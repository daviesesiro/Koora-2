import React,{useState} from 'react'
import SideNav from '../side-nav/side-nav.component';
import MobileNav from '../mobile-nav/mobile-nav.component';

export const Nav = () => {
    const [showSideNav, setShowSideNav] = useState(window.innerWidth > 500)
    setInterval((showSideNav) => {
        let isSideNav = window.innerWidth > 500;
        if(showSideNav!==isSideNav)setShowSideNav(isSideNav)        
    }, 1000);

    return (
        <>
            {showSideNav ? <SideNav/> : <MobileNav/>}       
        </>
    )
}
export default Nav;