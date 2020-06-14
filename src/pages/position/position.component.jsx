import React from 'react';

import PositionItem from '../../components/position-item/position-item.component';

import './position.styles.scss';
const PositionsPage = ({history}) => {
    return (
        <div className='position-page'>
            <h1 className='position-event-name'>First Event of the year</h1>
            <div className='position-items'>
                <PositionItem/>
                <PositionItem/>
                <PositionItem/>
                <PositionItem/>
            </div>
        </div>
    );
}
export default PositionsPage;