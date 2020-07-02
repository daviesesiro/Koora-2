import React,{useState} from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectIsAddEventBtnDisabled, selectAddEventProgress, selectErrorMessage } from '../../redux/profile/profile.selector';
import { addEventAsync } from '../../redux/profile/profile.async';

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import './event-form.styles.scss';

export const EventForm = ({currentUser, isAddEventBtnDisabled, addEventAsync, addEventProgress, errorMessage}) => {
    const [eventName, setEventName] = useState('');
    const [file, setFile] = useState(undefined);
    const [date, setDate] = useState(undefined);

    const handleChange = (e) => {
        setEventName(e.target.value);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleFileButton = () => {
        document.querySelector('.event-form .file').click();
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addEventAsync(currentUser.userId, eventName, file, date);
    }

    return (
        <div className='event-form'>
            <form onSubmit={handleSubmit}>
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                <FormInput
                    required
                    name='name'
                    value={eventName}
                    label={'Event Name'}
                    handleChange={handleChange}
                />
                <input
                    style={{ display: 'none' }}
                    onChange={handleFile}
                    className='file'
                    type='file'
                    required
                />
                <input
                    className='date'
                    type='datetime-local'
                    onChange={handleDate}
                />
                <br />
                <Button2 type='button' size='big1' color='red' handleClick={() => handleFileButton()}>Upload Image</Button2>
                <span className='file-name'>{file && file.name}</span>
                <div className='submit'>
                    <Button2 disabled={isAddEventBtnDisabled}
                        className='submit'
                        size='big2'
                        color='blue'
                    >
                        {!isAddEventBtnDisabled?'Add Event':'Adding Event'}
                    </Button2>

                    {addEventProgress>1?<progress className='progress-bar' max={100} value={addEventProgress} />:null}
                </div>                
            </form>
        </div>
    )
}
const mapState = createStructuredSelector({
    isAddEventBtnDisabled: selectIsAddEventBtnDisabled,
    currentUser: selectCurrentUser,
    addEventProgress: selectAddEventProgress,
    errorMessage: selectErrorMessage
});

const mapDispatch = dispatch => ({
    addEventAsync: (userId, eventName, file, date) => dispatch(addEventAsync(userId, eventName, file, date))
})

export default connect(mapState, mapDispatch)(EventForm);
