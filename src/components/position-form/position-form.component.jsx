import React, {useState} from 'react'

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

export const PositionForm = ({isAddPositionBtnDisabled,addPositionAsync, eventId, currentUser, errorMessage}) => {
    const [positionName, setPositionName] = useState('');
    const handleChange = (e) => {
        setPositionName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const success = addPositionAsync({ userId: currentUser.userId, eventId, positionName });
        console.log(success)
        if (success) {
            document.getElementById('pForm').reset();
        }
        
    }

    return (
        <div className='event-form'>
            <form id='pForm' onSubmit={handleSubmit}>
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                <FormInput
                    required
                    name='name'
                    value={positionName}
                    label={'Position Name'}
                    handleChange={handleChange}
                />
                <div className='submit'>
                    <Button2 disabled={isAddPositionBtnDisabled}
                        className='submit'
                        size='big2'
                        color='blue'
                    >
                        {!isAddPositionBtnDisabled?'Add Position':'Adding'}
                    </Button2>
                </div>                
            </form>
        </div>
    )
}

export default PositionForm;
