import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {selectCurrentUser } from '../../redux/user/user.selector';
import {selectUserNominees, selectIsFetching } from '../../redux/profile/profile.selector';
import {fetchUserNomineesAsync } from '../../redux/profile/profile.async';
import {toggleAddModal } from '../../redux/modal/modal.actions';
import { selectAddModal } from '../../redux/modal/modal.selector';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Modal from '../../components/modal/modal.component';
import NomineeItem from '../../components/nominee-item/nominee-item.component';
import Spinner from '../../components/spinner/spinner.component';
import Button2 from '../../components/button/button2.component';

import './profile-nominee.styles.scss';

class ProfileNomineePage extends React.Component{
    state = {
        loading: true
    }

    componentDidMount() {
        const { fetchUserNomineesAsync, currentUser, match } = this.props;
        fetchUserNomineesAsync(currentUser.userId, match.params.eventId, match.params.positionId);
    }
    render() {
        const { currentUser, nominees, toggleAddModal,modalState, isFetching } = this.props;
        if (isFetching) return <Spinner />
        return (
            <div className='profile-nominee'>
                <Modal modalState={modalState} toggleModal={toggleAddModal} >
                    'sdf'
                </Modal>
                <div className='top-content'>
                    <Link to='/profile'> <NavBack className='nav-back'/> </Link>
                    <h1 className='p-nominee-name'>Nominee</h1>
                </div>
                {console.log(nominees)}
                {(nominees.createdBy === currentUser.userId) ?
                    <div className='btn-container'>
                        <Button2 size='big2' color='blue' handleClick={toggleAddModal} className='btn add'>Add Position</Button2>
                        <Button2 size='big2' color='red' className='btn delete'>Toggle Delete</Button2>
                    </div>
                    : < div className='sucker-msg'><p>URL BROKEN</p></div>
                }
                <div className='p-nominee-items'>
                    {
                    nominees.data&&nominees.data.map((nominee) =>(
                        <NomineeItem key={nominee.id} nominee={nominee} />
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
    modalState: selectAddModal
});

const mapDispatchToProps = dispatch => ({
    fetchUserNomineesAsync: (userId, eventId, positionId) => dispatch(fetchUserNomineesAsync(userId, eventId, positionId)),
    toggleAddModal: () => dispatch(toggleAddModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNomineePage);