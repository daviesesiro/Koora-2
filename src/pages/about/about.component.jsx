import React, {useEffect} from 'react';

import './about.styles.scss';

const AboutPage = () => {
    useEffect(() => {
        document.title='Koora | About'
    }, [])
return (
    <div className='about-page'>
        <div className='about-content'>
            <h1>Nothing to see here</h1>
            <h3>Just Scraps, Please keep moving</h3>
        </div>
    </div>
);}

export default AboutPage;