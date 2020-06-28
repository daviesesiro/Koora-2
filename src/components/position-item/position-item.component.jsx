import React from 'react';

import { ReactComponent as CloseSvg } from '../../svgicon/cross.svg';
import './position-item.styles.scss';

const PositionItem = ({name, totalVotes}) =>(
    <div className='position-item'>
        <div className='position-name'>
            <span>{name}</span>
        </div>
        <p className='position-votes'>{totalVotes}</p>
        <CloseSvg className='delete-item'/>
    </div>
);

export default PositionItem;