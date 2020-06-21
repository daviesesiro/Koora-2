import React from 'react';
// import Button from '../button/button.component';

import './nominee-item.styles.scss';
import Axios from 'axios';

const NomineeItem = ({nominee:{ votes, name, id }}) => {
    console.log(id);
    const handleVote = () => {
        try {
            Axios.post('https://us-central1-koora-e1eb5.cloudfunctions.net/voteNominee').then((res) => {
                console.log(res);
                console.log(res.data);
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className="nominee-item">
            <div className='nominee-img'/>
            <div className='nominee-name'>{name}</div>
            <span className='nominee-votes'>{votes}</span>
            <span onClick={handleVote}>Vote</span>
        </div>
    );
}

export default NomineeItem;