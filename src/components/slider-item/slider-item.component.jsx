import React from 'react';

import Button from '../button/button.component';
import Typical from 'react-typical';
import './slider-item.styles.scss';

const SliderItem = () => (
    <div className='slider-item'>
        <div className='item-container'>
            <h1 className='head-text'>Koora <span>Voting</span> System</h1>
            <span className='typical'>Koora{' '}
                <Typical
                    loop={Infinity}
                    wrapper='span'
                    
                    steps={[
                        'is free😁',
                        1000,
                        'is safe😎',
                        1000,
                        'is secured👮🏿‍♂️',
                        1000, 
                        'is trustworthy😉',
                        1000,                    
                    ]}
                />
            </span><br/>
            <Button>View Latest events</Button>
        </div>
    </div>
);

export default SliderItem;