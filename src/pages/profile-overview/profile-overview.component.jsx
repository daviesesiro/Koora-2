import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser,selectUserEvents } from '../../redux/user/user.selector';
import { setUserEvents } from '../../redux/user/user.actions'
import { showModal } from '../../redux/event/event.actions';

import Spinner from '../../components/spinner/spinner.component';
import EventItem from '../../components/event-item/event-item.component';
import Modal from '../../components/modal/modal.component';
import {db, auth} from '../../firebase/firebase.utils';

import './profile-overview.styles.scss';

class ProfileOverview extends React.Component {
    state = {
        loading: false
    }
    componentDidMount() {
        const { currentUser, setEvents } = this.props;
        document.title = `Koora | ${currentUser.email}`;
        this.setState({ loading: true });
        
        let events = [];
        if(currentUser){
            db.collection('events').where('userId', "==", `${currentUser.userId}`)
                .orderBy('start_at', 'desc').get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    events.push({ id: doc.id, ...doc.data() })
                })
                setEvents(events);
                this.setState({ loading: false });            
            });
        }
    }

    render() {
        const { currentUser, userEvents, toggleModal, history, match } = this.props;
        const { loading } = this.state;         
        return (            
            <div className="profile-page">
                <Modal children={<h1>Hello</h1>} />
                <div className='top-content'>
                    <h1 className='username'>{currentUser.email}</h1>
                    
                    <div className='btn-container'>
                        <div onClick={()=>toggleModal()} className='btn add-event'>Create new</div>
                        <div onClick={()=>auth.signOut()} className='btn logout' >Logout out</div>
                    </div>
                    <hr/>
                    <hr/>
                    <h3 className='sub-head'>These are your events</h3>
                </div>
                <div className="event-items-container">
                    {(!loading) ?
                        <div className='event-items'>
                            {userEvents.map(({ id, ...otherProps }) => (
                            <EventItem handleClick={()=>history.push(`${match.path}/${id}`)} key={id} {...otherProps} />
                            ))}
                        </div>
                    :
                    <Spinner/>
                    }
                </div>                    
                
            </div>
            );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userEvents: selectUserEvents
});

const mapDispatchToProps = dispatch => ({
    setEvents: (events) => dispatch(setUserEvents(events)),
    toggleModal: () => dispatch(showModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOverview);