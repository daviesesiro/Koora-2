import React from 'react';

import EventItem from '../../components/event-item/event-item.component';
import './profile.styles.scss';

const ProfilePage = () => (
    <div className="profile-page">
        <div className='top-conent'>
            <h1>profile page</h1>
            <h3>These are your events</h3>
            <div className='add-event-toggle'>
                +
            </div>
        </div>
        <div className='event-items'>
            <EventItem/>
            <EventItem/>
            <EventItem/>
            <EventItem/>
        </div>
    </div>
);

export default ProfilePage;