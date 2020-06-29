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
        document.querySelector('.event-form .file').click();
    }
    return (
        <div className='event-form'>
            <form>
                <FormInput
                    name='name'
                    value={eventName}
                    label={'Event Name'}
                    handleChange={handleChange}
                />
                <input
                    style={{ display: 'none' }}
                    onChange={(e)=>handleFile(e)}
                    className='file'
                    type='file'
                />
                <Button2 type='button' size='big1' color='red' handleClick={() => handleFileButton()}>Upload Image</Button2>
                <span className='file-name'>{file && file.name}</span>
                <div className='submit'>
                    <Button2 className='submit' size='big2' color='blue'>Add Event</Button2>
                </div>                
            </form>
        </div>
    )
}

export default EventForm;
