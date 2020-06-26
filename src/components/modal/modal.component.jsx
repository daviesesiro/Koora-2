import React,{useState} from 'react';

import {ReactComponent as CloseSvg} from '../../svgicon/cross.svg'
import './modal.styles.scss';

export const Modal = ({ show, children }) => {
    const [showModal, setshowModal] = useState(show);

    const overlayClick = (e) => {
        if(e.target.className === 'modal-overlay'){
            setshowModal(!showModal);            
        }
    }

    if (showModal) {
        return (
            <div onClick={(e)=>overlayClick(e)} className='modal-overlay'>
                <div onClick={()=>null} className='modal-content'>
                    <CloseSvg className='close-svg'/>
                    {children}
                </div>
            </div>
        )        
    } else {
        return null
    }
}
export default Modal;
