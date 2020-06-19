import React from 'react';

import './position-item.styles.scss';

const PositionItem = ({handleClick, name, votes}) =>(
    <div onClick={handleClick} className='position-item'>
        <div className='position-name'>
            <span>{name}</span>
        </div>
        <p className='position-votes'>{votes}</p>
    </div>
);

export default PositionItem;