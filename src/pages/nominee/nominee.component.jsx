import React from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase/firebase.utils';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import NomineeItem from '../../components/nominee-item/nominee-item.component';
import { toast,ToastContainer } from 'react-toastify';
import Spinner from '../../components/spinner/spinner.component';
import Axios from 'axios';
import { showPop } from '../../redux/user/user.actions';

import 'react-toastify/dist/ReactToastify.css';
import './nominee.styles.scss';

class NomineesPage extends React.Component {
    state = {
        loading: true,
        isDisabled: false
    }

    unsubscribe = null;

    handleVote = (id) => {
        this.setState({ isDisabled: true });
        const { currentUser, match, toggleLoginPop } = this.props;
        if (!currentUser) {
            toggleLoginPop();
            this.setState({ isDisabled: false });
            return;
        }
        Axios.post('https://us-central1-koora-e1eb5.cloudfunctions.net/voteNominee', {
            userId: currentUser.userId,
            nomineeId: id,
            positionId: match.params.positionId
        }).then((res) => {
            console.log(res);
            this.setState({ isDisabled: false });
            toast.info(res.data.message, {
                position: toast.POSITION.TOP_CENTER                
            });
            
        }).catch((error) => {
            console.log(error)
        })       
    
    }
    getData() {
        this.setState({ loading: true });        
        const {match, setNominees} = this.props;
        
        this.unsubscribe = db.collection('nominees').where('positionId', "==", `${match.params.positionId}`).onSnapshot(snapshot => {  
            setNominees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            this.setState({ loading: false });
        });
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
                    <NavBack className='nav-back' onClick={()=> history.goBack()}/>
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

const mapStateToProps = (state) => ({
    Nominees: state.event.nominees,
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setNominees: nominees => dispatch({ type: 'SET_NOMINEES', payload: nominees }),
    toggleLoginPop: () => dispatch(showPop())
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);