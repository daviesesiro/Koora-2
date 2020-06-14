import React,{useState} from 'react';

import FormInput from '../../components/form-input/form-input.component';
import EventItem from '../../components/event-item/event-item.component';
import './events.styles.scss';
const EventsPage = ({ history, match }) => {
    const [searchField, setsearchField] = useState('');

    const handleChange = (e) => {
        setsearchField(e.target.value);
    }
    const handleClick = () => (
        history.push(`${match.path}/1`)
    );
    
    return(
    <div className="events-page">
        <div className='event-content-all'>
            <div className='search'>
                <FormInput handleChange={handleChange} label="Search Events..." value={searchField}/>
            </div>

            <div className='event-items'>
                <EventItem handleClick={handleClick}/>
                <EventItem />
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
            </div>
        </div>
        
    </div>
    );
}

export default EventsPage;