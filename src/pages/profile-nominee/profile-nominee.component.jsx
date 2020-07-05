import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {selectCurrentUser } from '../../redux/user/user.selector';
import {selectUserNominees, selectIsFetching, selectIsAddPositionBtnDisabled, selectErrorMessage } from '../../redux/profile/profile.selector';
import {fetchUserNomineesAsync, addNomineeAsync } from '../../redux/profile/profile.async';
import {toggleAddModal } from '../../redux/modal/modal.actions';
import { selectAddModal } from '../../redux/modal/modal.selector';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import PositionForm from '../../components/nominee-form/nominee-form.component';
import Modal from '../../components/modal/modal.component';
import NomineeItem from '../../components/nominee-item/nominee-item.component';
import Spinner from '../../components/spinner/spinner.component';
import Button2 from '../../components/button/button2.component';

import './profile-nominee.styles.scss';
import { voteNomineeAsync } from '../../redux/event/event.async';
import { ToastContainer } from 'react-toastify';

class ProfileNomineePage extends React.Component{
    state = {
        loading: true
    }

    handleVote = (nomineeId, e) => {
        const { match, currentUser, voteNomineeAsync } = this.props;
        voteNomineeAsync({e, currentUser, positionId: match.params.positionId, nomineeId})    
    }

    componentDidMount() {
        const { fetchUserNomineesAsync, currentUser, match } = this.props;
        const userId = currentUser.userId; 
        const {eventId, positionId} = match.params;
        fetchUserNomineesAsync({userId, eventId, positionId});
    }
    render() {
        const { 
            currentUser, 
            nominees, 
            toggleAddModal, 
            modalState, 
            isFetching,
            errorMessage,
            isAddPositionBtnDisabled,
            match,
            addNomineeAsync} = this.props;
        
        const { eventId, positionId } = match.params;
        
        if (isFetching) return <Spinner />

        return (
            <div className='profile-nominee'>
                <ToastContainer autoClose={2000} />
                <Modal title='Create New Nominee' modalState={modalState} toggleModal={toggleAddModal} >
                    <PositionForm
                        isAddPositionBtnDisabled={isAddPositionBtnDisabled}
                        userId={currentUser.userId}
                        errorMessage={errorMessage}
                        eventId={eventId}
                        positionId={positionId}
                        addNomineeAsync={addNomineeAsync}
                    />
                </Modal>
                <div className='top-content'>
                    <Link to={`/profile/${eventId}`}> <NavBack className='nav-back'/> </Link>
                    <h1 className='p-nominee-name'>{nominees.positionName} Nominee</h1>
                </div>
                {(nominees.createdBy === currentUser.userId) ?
                    <div className='btn-container'>
                        <Button2 size='big2' color='blue' handleClick={toggleAddModal} className='btn add'>Add Nominee</Button2>
                        <Button2 size='big2' color='red' className='btn delete'>Toggle Delete</Button2>
                    </div>
                    : < div className='sucker-msg'><p>URL BROKEN</p></div>
                } 
                <div className='p-nominee-items'>
                    {
                    nominees.data&&nominees.data.map((nominee) =>(
                        <NomineeItem handleVote={this.handleVote} key={nominee.id} nominee={nominee} />
                    ))
                    }     
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    nominees: selectUserNominees,
    isFetching: selectIsFetching,
    modalState: selectAddModal,
    isAddPositionBtnDisabled: selectIsAddPositionBtnDisabled,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
    fetchUserNomineesAsync: (data) => dispatch(fetchUserNomineesAsync(data)),
    toggleAddModal: () => dispatch(toggleAddModal()),
    addNomineeAsync: (data) => dispatch(addNomineeAsync(data)),
    voteNomineeAsync:(data)=>dispatch(voteNomineeAsync(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNomineePage);