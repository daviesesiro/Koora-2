import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectModal } from '../../redux/event/event.selector';
import { ReactComponent as CloseSvg } from '../../svgicon/cross.svg'
import { showModal } from '../../redux/event/event.actions';

import './modal.styles.scss';

export const Modal = ({ modalState, toggleModal, children }) => {

    const overlayClick = (e) => {
        if(e.target.className === 'modal-overlay'){
            toggleModal();            
        }
    }

    if (modalState) {
        return (
            <div onClick={(e)=>overlayClick(e)} className='modal-overlay'>
                <div className='modal-content'>
                    <CloseSvg onClick={()=>toggleModal()} className='close-svg'/>
                    {children}
                </div>
            </div>
        )        
    } else {
        return null
    }
}

const mapStateToProps = createStructuredSelector({
    modalState: selectModal
});

const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(showModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
