import React from 'react';

import './button1.styles.scss'

export const Button1 = ({ children, ...otherProps }) => (
    <button className='button1' {...otherProps}>
        {children}
    </button>
);

export default Button1;