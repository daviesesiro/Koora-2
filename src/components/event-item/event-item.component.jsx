import React from 'react';

import './event-item.styles.scss';

const EventItem = ({handleClick}) => (
    <div className='event-item' onClick={handleClick}>
        <div className='event-image'>
            
        </div>
        <div className='event-content'>
            <p className='event-name'>Freshes fresher</p>
            <span className='event-created-date'>Starts: Tomomor</span><br/>
            <span className='event-end-date'>Ends: today</span>
        </div>
    </div>
);

export default EventItem;