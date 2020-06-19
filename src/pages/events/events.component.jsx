import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase/firebase.utils';
import { setEvents } from '../../redux/event/event.actions';

import FormInput from '../../components/form-input/form-input.component';
import EventItem from '../../components/event-item/event-item.component';
import './events.styles.scss';
const EventsPage = ({ history, match, pageEvents, setEvents }) => {
    const [searchField, setsearchField] = useState('');

    const handleChange = (e) => {        
        setsearchField(e.target.value);
    }
    const handleClick = (eventId) => (
        history.push(`${match.path}/${eventId}`)
    );
    useEffect(() => {
        let events = [];
        db.collection('events').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                events.push({ ...events, id: doc.id, ...doc.data() });
            })
            setEvents(events);
        });
        
    }, [setEvents])
    return(
    <div className="events-page">
        <div className='event-content-all'>
            <div className='search'>
                <FormInput handleChange={handleChange} label="Search Events..." value={searchField}/>
            </div>

                <div className='event-items'>
                    {
                        pageEvents.map(({ id, ...otherProps }) => {
                            return <EventItem key={id} {...otherProps} handleClick={() => handleClick(id)} />
                        })
                    }
            </div>
        </div>
        
    </div>
    );
}

const mapStateToProps = (state) => ({
    pageEvents: state.event.events
});

const mapDispatchToProps = dispatch => ({
    setEvents: (events) => dispatch(setEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);