import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase/firebase.utils';

import PositionItem from '../../components/position-item/position-item.component';

import './position.styles.scss';
const PositionsPage = ({ history, match, setPosition, positions }) => {
    
    useEffect(() => {
        const positions = [];
        db.collection('positions').where('eventId', '==', `${match.params.eventId}`).get().then((snapShot) => {
            snapShot.docs.forEach(position => {
                positions.push({id: position.id, ...position.data() })
            });
            setPosition(positions);
        });
    },[])
    return (
        <div className='position-page'>
            <span onClick={()=> history.goBack()}>{'<<<<'}</span>
            <h1 className='position-event-name'>First Event of the year</h1>
            <div className='position-items'>
                {
                    positions.map(({id, ...otherProps}) =>(
                        <PositionItem handleClick={()=>history.push(`${match.url}/${id}`)} key={id} {...otherProps} />
                    ))
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    positions: state.event.positions
});

const mapDispatchToProps = dispatch => ({
    setPosition: (positions) => dispatch({type:"SET_POSITION", payload:positions}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionsPage);