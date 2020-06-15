import React from 'react';

import Button from '../button/button.component';

import './nominee-item.styles.scss';

const NomineeItem = () => (
    <div className="nominee-item">
        <div className='nominee-name'>Davies</div>
        <Button>Vote</Button>
    </div>
);

export default NomineeItem;