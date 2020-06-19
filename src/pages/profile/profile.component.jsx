import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import EventItem from '../../components/event-item/event-item.component';
import {db, auth} from '../../firebase/firebase.utils';

import './profile.styles.scss';

const ProfilePage = ({currentUser}) => {
    useEffect(() => {
        let events = [];
        db.collection('events').where('userId', "==", `${auth.currentUser.uid}`).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                events.push({...events, id: doc.id, ...doc.data()})
            })
        })
    }, [])
    return(
    <div className="profile-page">
        <div className='top-conent'>
            <h1>profile page</h1>
            <h3>These are your events</h3>
            <div className='add-event-toggle'>
                +
            </div>
        </div>
        <div className='event-items'>
            
        </div>
    </div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfilePage);