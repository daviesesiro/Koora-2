import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser,selectUserEvents } from '../../redux/user/user.selector';
import { setUserEvents } from '../../redux/user/user.actions'

import Spinner from '../../components/spinner/spinner.component';
import EventItem from '../../components/event-item/event-item.component';
import Create from '../create';
import {db, auth} from '../../firebase/firebase.utils';

import './profile.styles.scss';
import { Redirect } from 'react-router-dom';

class ProfilePage extends React.Component {
    state = {
        loading: false
    }
    componentDidMount() {
        this.setState({ loading: true });
        const { currentUser, setEvents } = this.props;
        let events = [];
        if(currentUser){
        db.collection('events').where('userId', "==", `${currentUser.userId}`).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() })
            })
            setEvents(events);
            this.setState({ loading: false });
        });}
    }

    render() {
        const { currentUser, userEvents } = this.props;
        const { loading } = this.state;
        if (currentUser) {             
        return (            
            <div className="profile-page">
                <Create/>
                <div className='top-content'>
                    <h1 className='username'>{currentUser.email}</h1>
                    <h3 className='sub-head'>These are your events</h3>
                    <div className='btn-container'>
                        <div className='btn add-event'>Create new</div>
                        <div onClick={()=>auth.signOut()} className='btn logout' >Logout out</div>
                    </div>
                </div>
            
                {(!loading) ?
                    <div className='event-items'>
                        {userEvents.map(({ id, ...otherProps }) => (
                        <EventItem key={id} {...otherProps} />
                        ))}
                    </div>
                :
                <Spinner/>
                }                    
                    
                
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