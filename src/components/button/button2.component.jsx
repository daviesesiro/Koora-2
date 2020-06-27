import React from 'react'

import './button2.styles.scss';


export const Button2 = ({ children, isBig, color, handleClick = (() =>{return;}), otherProps }) => {

    return (
        <button
            onClick={()=>handleClick()}
            className={`${isBig ? 'big' : ''} ${color} button2`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button2;
