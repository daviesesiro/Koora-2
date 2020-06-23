import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser,selectUserEvents } from '../../redux/user/user.selector';
import {setUserEvents} from '../../redux/user/user.actions'
import EventItem from '../../components/event-item/event-item.component';
import {db, auth} from '../../firebase/firebase.utils';

import './profile.styles.scss';
import { Redirect } from 'react-router-dom';

class ProfilePage extends React.Component {

    componentDidMount() {
        const { currentUser, setEvents } = this.props;
        let events = [];
        if(currentUser){
        db.collection('events').where('userId', "==", `${currentUser.userId}`).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() })
            })
            setEvents(events);
        });}
    }

    render() {
        const { currentUser, userEvents } = this.props;
        
        if (currentUser) {             
        return (            
            <div className="profile-page">
                <div className='top-content'>
                    <h1>{currentUser.email}</h1>
                    <h3>These are your event s</h3>
                    <div className='add-event-toggle'>
                        +
                    </div>
                    <div onClick={()=>auth.signOut()} >Logout out</div>
                </div>
                <div className='event-items'>
                    {
                            userEvents.map(({ id, ...otherProps }) => (
                            <EventItem key={id} {...otherProps}/>
                        ))
                    }
                </div>
            </div>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userEvents: selectUserEvents
});

const mapDispatchToProps = dispatch => ({
    setEvents : (events) => dispatch(setUserEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);