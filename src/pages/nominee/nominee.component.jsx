import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase/firebase.utils';
import NomineeItem from '../../components/nominee-item/nominee-item.component';

import './nominee.styles.scss';

const NomineesPage = ({ history, match, setNominees, Nominees }) => {
    useEffect(() => {
        let nominees = [];
        db.collection('nominee').where('positionId', "==", `${match.params.positionId}`).get().then(snapshot => {
            snapshot.docs.forEach((doc) => {
                nominees.push({id: doc.id, ...doc.data()})
            })
            setNominees(nominees);
        })
    },[])
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
                    Nominees.map(({ id, ...otherProps }) => (
                        <NomineeItem key={id} {...otherProps}/>
                    ))
                }
        </div>
    </div>
    );
}

const mapStateToProps = (state) => ({
    Nominees: state.event.nominees
});

const mapDispatchToProps = dispatch => ({
    setNominees: nominees => dispatch({ type: 'SET_NOMINEES', payload: nominees })
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);