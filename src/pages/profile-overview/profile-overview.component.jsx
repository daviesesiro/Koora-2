import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';
import {selectUserEvents, selectIsFetching } from '../../redux/profile/profile.selector';
import { fetchUserEventsAsync } from '../../redux/profile/profile.async';
import { SignOutUserAsync } from '../../redux/user/user.async';
import { toggleAddModal } from '../../redux/modal/modal.actions';
import { selectAddModal } from '../../redux/modal/modal.selector';

import Button2 from '../../components/button/button2.component';
import EventForm from '../../components/event-form/event-form.component';
import Spinner from '../../components/spinner/spinner.component';
import EventItem from '../../components/event-item/event-item.component';
import Modal from '../../components/modal/modal.component';

import './profile-overview.styles.scss';

class ProfileOverview extends React.Component {

    componentDidMount() {
        const { currentUser, fetchUserEventsAsync, events } = this.props;
        document.title = `Koora | ${currentUser.email}`;
        
        if(events.length===0){
            fetchUserEventsAsync(currentUser.userId);
        }
    }

    render() {
        const { currentUser, events, addModalState, toggleAddModal, match, isFetching,SignOutUserAsync } = this.props;       
        return (            
            <div className="profile-page">
                <Modal modalState={addModalState} toggleModal={toggleAddModal} title='Create Event'>
                    <EventForm/>
                </Modal>
                
                <div className='top-content'>
                    <h1 className='username'>{currentUser.email}</h1>
                    
                    <div className='btn-container'>
                        <Button2
                            type='button'
                            color='blue'
                            handleClick={toggleAddModal}
                            className='btn add-event'
                        >
                            Add Event
                        </Button2>
                        <Button2
                            color='red'
                            handleClick={() => SignOutUserAsync()} 
                            className='btn logout' 
                        >
                            Logout
                        </Button2>
                    </div>
                    <hr/><hr/>
                    <h3 className='sub-head'>These are your events</h3>
                    <hr/><hr/>
                </div>

                    {(isFetching) ? <Spinner />
                        :
                        <div className='event-items'>
                            {events&&events.map(({ id, ...otherProps }) => (
                                <EventItem key={id} url={`${match.path}/${id}`} {...otherProps} />
                            ))}
                        </div>                    
                    }                
                
            </div>
            );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    events: selectUserEvents,
    isFetching: selectIsFetching,
    addModalState: selectAddModal
});

const mapDispatchToProps = dispatch => ({
    fetchUserEventsAsync: (userId) => dispatch(fetchUserEventsAsync(userId)),
    SignOutUserAsync: ()=> dispatch(SignOutUserAsync()),
    toggleAddModal: () => dispatch(toggleAddModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOverview);