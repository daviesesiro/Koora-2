import React from 'react';

import './position-item.styles.scss';

const PositionItem = () => (
    <div className='position-item'>
        <div className='position-name'>
            <span>First Event of the year</span>
        </div>
        <p className='position-votes'>340</p>
    </div>
);

export default PositionItem;