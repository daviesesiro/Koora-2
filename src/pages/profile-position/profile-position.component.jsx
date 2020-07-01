import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';
import {selectUserPositions, selectIsFetching } from '../../redux/profile/profile.selector';
import {fetchUserPositionsAsync } from '../../redux/profile/profile.async';
import {toggleAddModal } from '../../redux/modal/modal.actions';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Modal from '../../components/modal/modal.component';
import PositionItem from '../../components/position-item/position-item.component';
import Spinner from '../../components/spinner/spinner.component';
import Button2 from '../../components/button/button2.component';

import './profile-position.styles.scss';
import { Link } from 'react-router-dom';
import { selectAddModal } from '../../redux/modal/modal.selector';

class ProfilePositionPage extends React.Component{
    state = {
        loading: true
    }

    componentDidMount() {
        const { fetchUserPositionsAsync, currentUser, match } = this.props;
        const userId = currentUser.userId;
        const eventId = match.params.eventId;
        fetchUserPositionsAsync(userId,eventId);
    }
    render() {
        const { history, match, currentUser, positions, toggleAddModal,modalState, isFetching } = this.props;
        if (isFetching) return <Spinner />
        return (
            <div className='profile-position'>
                <Modal modalState={modalState} toggleModal={toggleAddModal} >
                    'sdf'
                </Modal>
                <div className='top-content'>
                    <Link to='/profile'> <NavBack className='nav-back'/> </Link>
                    <h1 className='p-position-event-name'>Positions</h1>
                </div>
                {console.log(positions)}
                {(positions.createdBy === currentUser.userId) ?
                    <div className='btn-container'>
                        <Button2 size='big2' color='blue' handleClick={toggleAddModal} className='btn add'>Add Position</Button2>
                        <Button2 size='big2' color='red' className='btn delete'>Toggle Delete</Button2>
                    </div>
                    : < div className='sucker-msg'><p>You are not supposed to be here sucker!!!</p></div>
                }
                <div className='p-position-items'>
                    {
                    positions&&positions.data.map(({id, ...otherProps}) =>(
                        <Link key={id} to={`${match.url}/${id}`}>
                            <PositionItem  {...otherProps} />
                        </Link>
                    ))
                    }                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    positions: selectUserPositions,
    isFetching: selectIsFetching,
    modalState: selectAddModal
});

const mapDispatchToProps = dispatch => ({
    fetchUserPositionsAsync: (userId, eventId) => dispatch(fetchUserPositionsAsync(userId, eventId)),
    toggleAddModal: () => dispatch(toggleAddModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePositionPage);