import React from 'react';

import SliderItem from '../../components/slider-item/slider-item.component';
import './home.styles.scss';

export const HomePage = () => (
    <div className='home'>
        <div className='content-container'>
            <div className='slider-img'>    
                <SliderItem className='slider-item'/>    
                <img src="ballot.jpg" alt="hero"/>
            </div> 
            <div className='overview'>                
                <h1 className='text-head'>Robust security measures you can rely on.</h1>
                <div className='overview-content'>
                    <div className='text-content'>
                        <p className='text-subhead'>
                            Our online election software security measures protect you, your data, and your organization against risk.
                        </p>
                        <ul>
                            <li><b>Safeguard organizational data.</b> Our cybersecurity measures protect your sensitive data.</li>
                            <li><b>Eliminate the risk of double voting and voter fraud</b>. Closed voting events enable trustworthy decision making.</li>
                            <li><b>Prove the integrity of your vote.</b> Our robust auditing tools let you demonstrate an accountable voting process.</li>
                        </ul>
                    </div>
                    <div className='image-content'>
                        <img src="security.jpg" alt="security"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;