import React,{useState} from 'react'

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import './event-form.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAddEventBtnDisabled } from '../../redux/profile/profile.selector';

export const EventForm = ({isAddEventBtnDisabled}) => {
    const [eventName, setEventName] = useState('');
    const [file, setFile] = useState(undefined);

    const handleChange = (e) => {
        setEventName(e.target.value);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
    }

    const handleFileButton = () => {
        document.querySelector('.event-form .file').click();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className='event-form'>
            <form onSubmit={handleSubmit}>
                <FormInput
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
                />
                <input type='date' title='dates'/>
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
                </div>                
            </form>
        </div>
    )
}
const mapState = createStructuredSelector({
    isAddEventBtnDisabled: selectIsAddEventBtnDisabled
});

export default connect(mapState)(EventForm);
