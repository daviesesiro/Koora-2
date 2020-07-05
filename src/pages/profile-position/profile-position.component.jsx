import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';
import {selectUserPositions, selectIsFetching, selectIsAddPositionBtnDisabled, selectErrorMessage } from '../../redux/profile/profile.selector';
import {fetchUserPositionsAsync, addPositionAsync, deletePositionAsync } from '../../redux/profile/profile.async';
import {toggleAddModal } from '../../redux/modal/modal.actions';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Modal from '../../components/modal/modal.component';
import PositionItem from '../../components/position-item/position-item.component';
import Spinner from '../../components/spinner/spinner.component';
import Button2 from '../../components/button/button2.component';

import './profile-position.styles.scss';
import { Link } from 'react-router-dom';
import { selectAddModal } from '../../redux/modal/modal.selector';
import { PositionForm } from '../../components/position-form/position-form.component';

class ProfilePositionPage extends React.Component{
    state = {
        showDelete:false 
    }

    componentDidMount() {
        const { fetchUserPositionsAsync, currentUser, match } = this.props;
        fetchUserPositionsAsync({currentUser,eventId: match.params.eventId});
    }
    render() {
        const {
            match,
            currentUser,
            positions,
            toggleAddModal,
            modalState,
            isFetching,
            errorMessage,
            isAddPositionBtnDisabled,
            addPositionAsync,
            deletePositionAsync
        } = this.props;
        
        const isOwner = (positions.createdBy === currentUser.userId)

        const { showDelete } = this.state;

        if (isFetching) return <Spinner />
        return (
            <div className='profile-position'>
                <Modal modalState={modalState} toggleModal={toggleAddModal} >
                    <PositionForm
                        currentUser={currentUser}
                        eventId={match.params.eventId}
                        errorMessage={errorMessage}
                        isAddPositionBtnDisabled={isAddPositionBtnDisabled}
                        addPositionAsync={addPositionAsync}
                    />
                </Modal>
                <div className='top-content'>
                    <Link to='/profile'> <NavBack className='nav-back'/> </Link>
                    <h1 className='p-position-event-name'>{positions.eventName} Positions</h1>
                </div>
                {isOwner ?
                    <div className='btn-container'>
                        <Button2
                            size='big2'
                            color='blue'
                            handleClick={toggleAddModal}
                            className='btn add'>
                            Add Position
                        </Button2>
                        <Button2
                            handleClick={() => this.setState({ showDelete: !showDelete })}
                            size='big2'
                            color='red'
                            className='btn delete'>
                            Toggle Delete
                        </Button2>
                    </div>
                    : < div className='sucker-msg'><p>You are not supposed to be here sucker!!!</p></div>
                }
                <div className='p-position-items'>
                    {
                    positions&&positions.data.map((position) =>(
                        <PositionItem key={position.id}
                            url={`${match.url}/${position.id}`}
                            deleteItem={deletePositionAsync}
                            isOwner={{ isOwner, showDelete }}
                            {...position}
                        />
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
    modalState: selectAddModal,
    isAddPositionBtnDisabled: selectIsAddPositionBtnDisabled,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
    fetchUserPositionsAsync: (data) => dispatch(fetchUserPositionsAsync(data)),
    toggleAddModal: () => dispatch(toggleAddModal()),
    addPositionAsync: (data) => dispatch(addPositionAsync(data)),
    deletePositionAsync: (id)=> dispatch(deletePositionAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePositionPage);