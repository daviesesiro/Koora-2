import React from 'react';
import { Link } from 'react-router-dom';

import './event-item.styles.scss';

const EventItem = ({handleClick, name, end_at,start_at, isProfile = false}) => (
    <div className='event-item' onClick={handleClick}>
        <div className='event-image' />
        {isProfile?<Link className='event-item-link' to='/events'> hi </Link>: null }
        
        <div className='event-content'>
            <p className='event-name'>{name}</p>
            <span className='event-created-date'>Started at: {new Date(start_at.seconds*1000).toDateString()}</span><br/>
            <span className='event-end-date'>ending at: {new Date(end_at.seconds*1000).toDateString()}</span>
        </div>
    </div>
);

export default EventItem;