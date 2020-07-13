import React,{useState} from 'react'

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from '../../image.utils';

import 'react-image-crop/dist/ReactCrop.css'
import './nominee-form.styles.scss';

export const NomineeForm = ({
    userId, 
    positionId, 
    eventId, 
    isAddPositionBtnDisabled, 
    addNomineeAsync, 
    errorMessage
}) => {
    
    const [nomineeName, setNomineeName] = useState('');
    const [file, setFile] = useState(null);
    const [src, setSrc] = useState(null)
    const [newFile, setNewFile] = useState(null)
    const [crop, setCrop] = useState({aspect:1/1})

    const handleChange = (e) => {
        setNomineeName(e.target.value);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleFileButton = () => {
        document.querySelector('.nominee-form .file').click();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addNomineeAsync({userId, positionId, eventId, nomineeName, file});
    }
    const handleOnImageLoaded = () => {
        const selection = document.querySelector('.ReactCrop__crop-selection')
        if (selection) {
            selection.style.width = 0;
            selection.style.height = 0;
            
        }
    }

    const handleOnCropComplete = async () => {
        const imageO = document.querySelector('.ReactCrop__image');
        const canvasRef = document.getElementById('imageCanvas');
        if (file) {
            const croppedImage = await getCroppedImg(imageO, crop, file.name, canvasRef)
            setNewFile(croppedImage);      
        }
    }

    return (
        <div className='nominee-form'>
            <form onSubmit={handleSubmit}>
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                <FormInput
                    required
                    name='name'
                    value={nomineeName}
                    label={'Nominee Name'}
                    handleChange={handleChange}
                />
                <input
                    style={{ display: 'none' }}
                    onChange={handleFile}
                    className='file'
                    type='file'
                />
                <label htmlFor="end-at">*Optional Nominee Image:</label>
                <br />
                <div className="image-container">
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onChange={(crop) => setCrop(crop)}
                        onComplete={handleOnCropComplete}
                        className='image-crop'
                        onImageLoaded={handleOnImageLoaded}
                    />
                </div>
                <Button2
                    type='button'
                    size='big1'
                    color='red'
                    handleClick={handleFileButton}>
                    Upload Image
                </Button2>
                <span style={{ textAlign: 'center', display: 'block' }} className='file-name'>{file && file.name}</span>
                <canvas id='imageCanvas'></canvas>
                <div className='submit'>
                    <Button2 disabled={isAddPositionBtnDisabled}
                        className='submit'
                        size='big2'
                        color='blue'
                    >
                        {!isAddPositionBtnDisabled?'Add Nominee':'Adding'}
                    </Button2>
                </div>                
            </form>
        </div>
    )
}

export default NomineeForm;
