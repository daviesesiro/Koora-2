import React, { createRef } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactCrop from 'react-image-crop';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectIsAddEventBtnDisabled, selectAddEventProgress, selectErrorMessage } from '../../redux/profile/profile.selector';
import { addEventAsync } from '../../redux/profile/profile.async';
import {getCroppedImg } from '../../image.utils';

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

import 'react-image-crop/dist/ReactCrop.css'
import './event-form.styles.scss';

class EventForm extends React.Component {
    constructor(props) {
        super(props)

        this.ImagePreviewCanvasRef = createRef();
        this.state = {
            file: null,
            eventName: '',
            crop: {
                aspect: 1 / 1
            },
            src: null,
            date: null,
            newFile: {},
            fileExtension: ''
        }
    }

    handleFile = async (e) => { 
        const file = e.target.files[0];
        if (file && file!==null) {
            this.setState({ file: e.target.files[0] });
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = async () => {
                this.setState({src:reader.result})
            }            
        }
    }

    handleFileButton = () => {
        document.querySelector('.event-form .file').click();
    }
    
    handleSubmit = (e) => {
        const { currentUser, addEventAsync, } = this.props;
        const { eventName, newFile, date } = this.state;
        e.preventDefault();
        addEventAsync(currentUser.userId, eventName, newFile, date);
    }

    handleOnCropComplete = async (crop) => {
        const imageO = document.querySelector('.ReactCrop__image');
        if (this.state.file) {
            const croppedImage = await getCroppedImg(imageO, crop, this.state.file.name, this.ImagePreviewCanvasRef.current)
            this.setState({ newFile: croppedImage });      
        }

    }

    handleOnImageLoaded = () => {
        const selection = document.querySelector('.ReactCrop__crop-selection')
        if (selection) {
            selection.style.width = 0;
            selection.style.height = 0;
            
        }
    }
    render() {
        const { isAddEventBtnDisabled, addEventProgress, errorMessage } = this.props;
        const {eventName, src, crop } = this.state;
        return (
            <div className='event-form'>
                <form onSubmit={this.handleSubmit}>
                    <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                    {}
                    <FormInput
                        required
                        name='name'
                        value={eventName}
                        label={'Event Name'}
                        handleChange={(e) => this.setState({ eventName: e.target.value })}
                    />
                    <input
                        style={{ display: 'none' }}
                        onChange={this.handleFile}
                        className='file'
                        type='file'
                    />
                    <label htmlFor="end-at">*Event ending:</label>
                    <input
                        name='end-at'
                        className='date'
                        type='datetime-local'
                        onChange={(e) => this.setState({date:e.target.value})}
                    />
                    <br />
                    <label htmlFor="end-at">*Upload Event Cover:</label>
                    <br />
                    <Button2
                        type='button'
                        size='big1'
                        color='red'
                        handleClick={this.handleFileButton}>
                        Upload Image
                    </Button2>
                    <div className="image-container">
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onChange={(crop) => this.setState({crop:crop})}
                            onComplete={this.handleOnCropComplete}
                            className='image-crop'
                            onImageLoaded={this.handleOnImageLoaded}
                        />
                    </div>
                    <div className='btn-container'>
                        <Button2 disabled={isAddEventBtnDisabled}
                            size='big2'
                            color='blue'
                        >
                            {!isAddEventBtnDisabled ? 'Add Event' : 'Adding Event'}
                        </Button2>
                    </div>
                    <canvas ref={this.ImagePreviewCanvasRef} ></canvas>
                    <progress className='progress-bar' max={100} value={addEventProgress} /> 
                </form>
            </div>
        );
    }
}
    
const mapStateToProps = createStructuredSelector({
    isAddEventBtnDisabled: selectIsAddEventBtnDisabled,
    currentUser: selectCurrentUser,
    addEventProgress: selectAddEventProgress,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
    addEventAsync: (userId, eventName, file, date) => dispatch(addEventAsync(userId, eventName, file, date))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
