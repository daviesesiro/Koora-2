import React from 'react';

import Button from '../button/button.component';
import ReactTypingEffect from 'react-typing-effect';
import './slider-item.styles.scss';

const SliderItem = () => (
    <div className='slider-item'>
        <div className='item-container'>
            <h1 className='head-text'>Koora <span>Voting</span> System</h1>
            <span className='typical'>Koora{' '}
                <ReactTypingEffect
                    text={[
                        'is free😁',
                        'is safe😎',
                        'is secured👮🏿‍♂️', 
                        'is trustworthy😉'                   
                    ]}
                    speed={100}
                    typingDelay={1000}
                    eraseDelay={1000}
                />
            </span><br/>
            <Button>View Latest events</Button>
        </div>
    </div>
);

export default SliderItem;