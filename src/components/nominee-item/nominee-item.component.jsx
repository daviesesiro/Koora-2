import React from 'react';

import Button1 from '../button/button1.component';

import './nominee-item.styles.scss';

const NomineeItem = ({ nominee: { votes, name, id, }, handleVote=()=>{return null}}) => {
    return (
        <div className="nominee-item">
            <div className="img-container">
                <div className='nominee-img'/>
            </div>
            <span className='nominee-votes'>{votes}</span>
            <div className='card-bottom'>
                <div className='nominee-name'>{name}</div>
                <Button1 onClick={(e)=>handleVote(id,e)}>Vote</Button1>
            </div>
            <span className='voting-loader'>i</span>
        </div>
    );
}
export default NomineeItem;