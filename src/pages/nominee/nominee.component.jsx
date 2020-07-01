import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Axios from 'axios';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectNominees, selectIsFetching } from '../../redux/event/event.selector';

import { fetchNomineesAsync } from '../../redux/event/event.async';
import {toggleSignInSignUp } from '../../redux/modal/modal.actions';

import { toast,ToastContainer } from 'react-toastify';
import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import NomineeItem from '../../components/nominee-item/nominee-item.component';
import Spinner from '../../components/spinner/spinner.component';

import 'react-toastify/dist/ReactToastify.css';
import './nominee.styles.scss';
import { Link } from 'react-router-dom';

class NomineesPage extends React.Component {
    unsubscribe = null;

    handleVote = (id, e) => {
        e.persist();
        const { currentUser, match, toggleSignSignOut } = this.props;
        if (!currentUser) {
            toggleSignSignOut();
            this.setState({ isDisabled: false });
            return ;
        }
        e.target.disabled = true;
        Axios.post('https://us-central1-koora-e1eb5.cloudfunctions.net/voteNominee', {
            userId: currentUser.userId,
            nomineeId: id,
            positionId: match.params.positionId
        }).then((res) => {
            console.log(res);
            e.target.disabled = false;
            toast.info(res.data.message, {
                position: toast.POSITION.TOP_CENTER                
            });
            
        }).catch((error) => {
            console.log(error)
        })      
    
    }

    componentDidMount() {
        const { match, fetchNomineesAsync } = this.props;
        fetchNomineesAsync(match.params.eventId, match.params.positionId);
    }

    render() {
        const {isFetching, nominees, match } = this.props;

        if (isFetching) return <Spinner />
        return(
            <div className='nominee-page'>
                <ToastContainer autoClose={2000} />
                <div className='top-content'>
                    <Link to={`/events/${match.params.eventId}`}><NavBack className='nav-back'/></Link>
                    <h1 className='position-title'>Nominees</h1>
                </div>
                    <div className='nominee-items'>
                    {
                        nominees&&nominees.map((nominee) => (
                            <NomineeItem handleVote={this.handleVote} key={nominee.id} nominee={nominee}/>
                        ))
                    }
                </div>
            </div>
        );        
    }

}

const mapStateToProps = createStructuredSelector({
    nominees: selectNominees,
    currentUser: selectCurrentUser,
    isFetching: selectIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchNomineesAsync: (eventId, positionId) => dispatch(fetchNomineesAsync(eventId, positionId)),
    toggleSignInSignUp: () => dispatch(toggleSignInSignUp())
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);