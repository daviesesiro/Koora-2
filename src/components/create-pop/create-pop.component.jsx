import React from 'react';

import './create-pop.styles.scss';

const CreatePop = () => (
    <div className='create-pop'>
        <div className='container'>
            <p className='next'>Next</p>
            <p className='close'>&times;</p>

            <div className='create-content'>
                <input type='file'/>
            </div>
        </div>
        
    </div>
);

export default CreatePop;