import React from 'react'

import './button2.styles.scss';


export const Button2 = ({ children, size, color, active, handleClick = (() => { return; }), ...otherProps }) => {
    return (
        <button
            {...otherProps}
            onClick={()=>handleClick()}
            className={`${size} ${active} ${color} button2`}            
        >
            {children}
        </button>
    )
}

export default Button2;
