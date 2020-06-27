import React,{useState} from 'react'

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import './event-form.styles.scss';
export const EventForm = () => {
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
        let fileInput = document.querySelector('.event-form .file');
        fileInput.click();
    }
    return (
        <div className='event-form'>
            <FormInput
                name='name'
                value={eventName}
                label={'Event Name'}
                handleChange={handleChange}
            />
            <input
                style={{ display: 'none' }}
                onChange={()=>handleFile()}
                className='file'
                type='file'
            />
            <Button2 color='red-1' handleClick={()=>handleFileButton()}>Upload Image</Button2>
        </div>
    )
}

export default EventForm;
