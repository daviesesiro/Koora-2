import React from 'react';

import './button.styles.scss'

export const Button = ({ children, ...otherProps }) => (
    <button {...otherProps} className='button'>
        {children}
    </button>
);

export default Button;