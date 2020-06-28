import React from 'react'

import './button2.styles.scss';


export const Button2 = ({ children, size, color, handleClick = (() =>{return;}), otherProps }) => {

    return (
        <button
            onClick={()=>handleClick()}
            className={`${size} ${color} button2`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button2;
