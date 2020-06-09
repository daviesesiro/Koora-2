import React, {useState} from 'react';

import {
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionLink,
    ToogleDrop
} from './header.styles';

const Header = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <HeaderContainer>
            <LogoContainer>
                {/* logo here */}<span>Logo</span>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/'>Home</OptionLink>
                <OptionLink to='/Events'>Events</OptionLink>
                <OptionLink to='/Places'>Places</OptionLink>
                <OptionLink to='/About'>About</OptionLink>
                <ToogleDrop>
                    <span onClick={() => { console.log(showDrop);setShowDrop(!showDrop)}} >|==|</span>
                </ToogleDrop>
            </OptionsContainer>
        </HeaderContainer>
    );
}

export default Header;