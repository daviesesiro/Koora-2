import React from 'react';
import './nominee-item.styles.scss';

const NomineeItem = ({ nominee: { votes, name, id, }, handleVote, isEnabled}) => {
    return (
        <div className="nominee-item">
            <div className="img-container">
                <div className='nominee-img'/>
            </div>
            <span className='nominee-votes'>{votes}</span>
            <div className='card-bottom'>
                <div className='nominee-name'>{name}</div>
                <button onClick={(e)=>handleVote(id,e)}>Vote</button>
            </div>
        </div>
    );
}
export default NomineeItem;