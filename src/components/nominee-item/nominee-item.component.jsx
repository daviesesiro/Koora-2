import React from 'react';

import Button1 from '../button/button1.component';

import './nominee-item.styles.scss';

const NomineeItem = ({ nominee: { votes, name, id, imageUrl }, handleVote=()=>{return null}}) => {
    return (
        <div className="nominee-item">
            <div  className="img-container">
                <div style={{ backgroundImage: `url(${imageUrl})` }} className='nominee-img'/>
            </div>
            <div className='card-bottom'>
                <div className="top">
                    <div className='nominee-name'>{name}</div>
                    <Button1 onClick={(e)=>handleVote(id,e)}>Vote</Button1>
                </div>
                <span className='nominee-votes'>{votes}</span>
            </div>
                <span className='voting-loader'>i</span>
        </div>
    );
}
export default NomineeItem;