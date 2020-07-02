import React from 'react';
import { Link } from 'react-router-dom';

import './event-item.styles.scss';
const formatDate = (date) => {
    var newDate = new Date(date);
    return `${newDate.toLocaleDateString()}  ${newDate.getHours()}:${newDate.getMinutes()}`
}
const EventItem = ({name, end_at,start_at, imageUrl, isProfile = false}) => (
    <div className='event-item'>
        <div className='event-image' style={{ backgroundImage: `url(${imageUrl})` }} />
        {isProfile?<Link className='event-item-link' to='/events'> hi </Link>: null }
        
        <div className='event-content'>
            <p className='event-name'>{name}</p>
            {/* <span className='event-created-date'>Started at: {start_at}</span><br/> */}
        <span className='event-end-date'> ending at: {formatDate(end_at)}</span> 
        </div>
    </div>
);

export default EventItem;