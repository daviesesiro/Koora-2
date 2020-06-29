import React from 'react'

import './button2.styles.scss';


export const Button2 = ({ children,
    size,
    color,
    handleClick = (() =>{
        return;
    }), 
    ...otherProps }) => {
    
    return (
        <button
            {...otherProps}
            onClick={()=>handleClick()}
            className={`${size} ${color} button2`}            
        >
            {children}
        </button>
    )
}

export default Button2;
