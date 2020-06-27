import React from 'react'

import './location-fade.styles.scss';

const LocationFade = ({ children }) => {
    console.log(children)
    return (
        <div className='fade'>
            {children}
        </div>
    )
}

export default LocationFade
