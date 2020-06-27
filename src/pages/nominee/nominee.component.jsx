import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { db } from '../../firebase/firebase.utils';
import { setNominees } from '../../redux/event/event.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectNominees } from '../../redux/event/event.selector';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import NomineeItem from '../../components/nominee-item/nominee-item.component';
import { toast,ToastContainer } from 'react-toastify';
import Spinner from '../../components/spinner/spinner.component';
import Axios from 'axios';
import {showSignSignOut } from '../../redux/user/user.actions';

import 'react-toastify/dist/ReactToastify.css';
import './nominee.styles.scss';

class NomineesPage extends React.Component {
    state = {
        loading: true
    }

    unsubscribe = null;

    handleVote = (id, e) => {
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
    getData() {
        this.setState({ loading: true });        
        const {match, setNominee} = this.props;
        
        this.unsubscribe = db.collection('nominees')
            .where('positionId', "==", `${match.params.positionId}`).onSnapshot(snapshot => {  
                setNominee(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                this.setState({ loading: false });
        });
    }

    handleBack = () => {
        
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { history, Nominees } = this.props;
        const { isDisabled, loading } = this.state;

        if (loading) return <Spinner />
        return(
            <div className='nominee-page'>
                <ToastContainer autoClose={2000} />
                <div className='top-content'>
                    <NavBack className='nav-back' onClick={()=> history.push(`/events/${Nominees[0].eventId}`)}/>
                    <h1 className='position-title'>Nominees</h1>
                </div>
                    <div className='nominee-items'>
                    {
                        Nominees.map((nominee) => (
                            <NomineeItem isEnabled={isDisabled} handleVote={this.handleVote} key={nominee.id} nominee={nominee}/>
                        ))
                    }
                </div>
            </div>
        );        
    }

}

const mapStateToProps = createStructuredSelector({
    Nominees: selectNominees,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setNominee: nominees => dispatch(setNominees(nominees)),
    toggleSignSignOut: () => dispatch(showSignSignOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);