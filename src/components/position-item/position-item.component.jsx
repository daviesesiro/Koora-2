import React from 'react';

import './position-item.styles.scss';

const PositionItem = ({handleClick, name, totalVotes}) =>(
    <div onClick={handleClick} className='position-item'>
        <div className='position-name'>
            <span>{name}</span>
        </div>
        <p className='position-votes'>{totalVotes}</p>
    </div>
);

export default PositionItem;