import React from 'react';

import { ReactComponent as CloseSvg } from '../../svgicon/cross.svg';
import './position-item.styles.scss';
import { Link } from 'react-router-dom';

const PositionItem = ({ name, totalVotes, isOwner={isOwner:false, showDelete:false}, deleteItem, id, url }) => (
    <div className='position-item'>
        <Link to={url}>
            <div className='position-name'>
                <span>{name}</span>
            </div>
            <p className='position-votes'>{totalVotes}</p>
        </Link>        
        {isOwner.isOwner&&isOwner.showDelete?
            <CloseSvg onClick={()=> deleteItem(id)} className='delete-item'/>:null
        }
    </div>
);

export default PositionItem;