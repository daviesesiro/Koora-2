import React from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase/firebase.utils';
import NomineeItem from '../../components/nominee-item/nominee-item.component';

import './nominee.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

class NomineesPage extends React.Component {
    state = {
        loading: true
    }
    getData() {
        this.setState({ loading: true });
        
        const {match, setNominees} = this.props;
        let nominees = [];
        db.collection('nominees').where('positionId', "==", `${match.params.positionId}`).get().then(snapshot => {
            snapshot.docs.forEach((doc) => {
                nominees.push({ id: doc.id, ...doc.data() })
            })            
            setNominees(nominees);
            this.setState({ loading: false });
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const { history, Nominees } = this.props;

        if (this.state.loading) return <Spinner />
        
        return(
        <div className='nominee-page'>
            <div className='nav-back'>
                <span onClick={()=> history.goBack()}>{'<<<<'}</span>
            </div>
            <div className='position-title'>
                Freshes fresher
            </div>
                <div className='nominee-items'>
                    {
                        Nominees.map((nominee) => (
                            <NomineeItem key={nominee.id} nominee={nominee}/>
                        ))
                    }
            </div>
        </div>
        );        
    }

}

const mapStateToProps = (state) => ({
    Nominees: state.event.nominees
});

const mapDispatchToProps = dispatch => ({
    setNominees: nominees => dispatch({ type: 'SET_NOMINEES', payload: nominees })
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);