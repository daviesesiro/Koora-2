import React, {useEffect} from 'react';

import SliderItem from '../../components/slider-item/slider-item.component';
import './home.styles.scss';



export const HomePage = () => {
    useEffect(() => {
        document.title = 'Koora | Home'
    }, [])
    
return(

    <div className='home'>
        <div className='content-container'>
            <div className='slider-img'>    
                <SliderItem className='slider-item'/>    
            </div> 
        </div>
    </div>
);
}
export default HomePage;