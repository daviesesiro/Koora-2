import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectModal } from '../../redux/event/event.selector';
import { ReactComponent as CloseSvg } from '../../svgicon/cross.svg'
import { toggleModal } from '../../redux/event/event.actions';

import './modal.styles.scss';

export const Modal = ({ title, modalState, toggleModal, children }) => {

    const overlayClick = (e) => {
        if(e.target.className === 'show modal-overlay' || e.target.className === 'disappear modal-overlay'){
            toggleModal();            
        }
    }
    
    return (
        <div onClick={(e)=>overlayClick(e)} className={`${modalState? 'show': 'disappear'} modal-overlay`}>
            <div className={`modal-content`}>
                <CloseSvg onClick={() => toggleModal()} className='close-svg' />
                <h1 className='modal-title'>{title}</h1>

                {children}
                
            </div>
        </div>
    )        
}

const mapStateToProps = createStructuredSelector({
    modalState: selectModal
});

const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(toggleModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
