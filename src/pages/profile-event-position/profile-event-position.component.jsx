import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { db } from '../../firebase/firebase.utils';

import {selectCurrentUser, selectUserPositions } from '../../redux/user/user.selector';
import {setUserPositions } from '../../redux/user/user.actions';
import {toggleModal } from '../../redux/event/event.actions';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Modal from '../../components/modal/modal.component';
import PositionItem from '../../components/position-item/position-item.component';
import EventForm from '../../components/event-form/event-form.component';
import Spinner from '../../components/spinner/spinner.component';

import './profile-event-position.styles.scss';

class ProfileEventPositionPage extends React.Component{
    state = {
        loading: true,
        createdBy: ''
    }

    componentDidMount() {
        this.setState({ loading: true });
        const { match, currentUser, setPositions } = this.props;
        db.collection('positions').where('eventId', '==', `${match.params.eventId}`)
            .where('userId', '==', `${currentUser.userId}`)
            .get().then(snapshot => {
                setPositions( snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) );
                
        });
        db.collection('events').doc(`${match.params.eventId}`)
            .get().then(snapshot => {
                this.setState({ createdBy: snapshot.data().userId });
                this.setState({ loading: false });
        })
    }
    render() {
        const { history, match, currentUser, positions, toggleModal } = this.props;
        const {createdBy } = this.state;
        if (this.state.loading) return <Spinner />
        
        return (
            <div className='profile-event-page'>
                <Modal>
                    {/* <EventForm/> */}
                </Modal>
                <div className='top-content'>
                    <NavBack className='nav-back'
                        onClick={() => history.push(`/profile`)} />
                    <h1 className='p-position-event-name'>Positions</h1>
                </div>
                {createdBy === currentUser.userId ?
                    <div className='btn-container'>
                        <div onClick={()=>toggleModal()} className='btn add'>Add Position</div>
                        <div className='btn delete'>Toggle Delete</div>
                    </div>
                    : <div className='sucker-msg'><p>You are not supposed to be here sucker!!!</p></div>
                }
                <div className='p-position-items'>
                    {
                    positions.map(({id, ...otherProps}) =>(
                        <PositionItem handleClick={()=>history.push(`${match.url}/${id}`)} key={id} {...otherProps} />
                    ))
                    }                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    positions: selectUserPositions
});

const mapDispatchToProps = dispatch => ({
    setPositions: positions => dispatch(setUserPositions(positions)),
    toggleModal: () => dispatch(toggleModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEventPositionPage);