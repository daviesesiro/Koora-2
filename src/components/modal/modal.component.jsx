import React from 'react';

import { ReactComponent as CloseSvg } from '../../svgicon/cross.svg'
// import { toggleModal } from '../../redux/modal/modal.actions';

import './modal.styles.scss';

export const Modal = ({ title, modalState, toggleModal, children }) => {

    const overlayClick = (e) => {
        if(e.target.className === 'show modal-overlay' || e.target.className === 'disappear modal-overlay'){
            toggleModal();            
        }
    }
    
    return (
        <div onDoubleClick={(e)=>overlayClick(e)} className={`${modalState? 'show': 'disappear'} modal-overlay`}>
            <div className={`modal-content`}>
                <CloseSvg onClick={() => toggleModal()} className='close-svg' />
                <h1 className='modal-title'>{title}</h1>

                {children}
                
            </div>
        </div>
    )        
}

export default Modal;
