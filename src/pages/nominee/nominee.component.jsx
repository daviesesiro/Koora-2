import React from 'react';

import NomineeItem from '../../components/nominee-item/nominee-item.component';

import './nominee.styles.scss';

const NomineesPage = ({history}) => (
    <div className='nominee-page'>
        <div className='nav-back'>
            <span onClick={()=> history.push('/events/1')}>{'<<<<'}</span>
        </div>
        <div className='position-title'>
            Freshes fresher
        </div>
        <div className='nominee-items'>
            <NomineeItem/>
            <NomineeItem/>
            <NomineeItem/>
            <NomineeItem/>
        </div>
    </div>
);

export default NomineesPage;