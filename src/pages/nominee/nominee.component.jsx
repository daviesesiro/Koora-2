import React from 'react';

const NomineesPage = ({history}) => (
    <div className='nominee-page'>
        <div className='nav-back'>
            <span onClick={()=> history.push('/events/1')}>{'<<<<'}</span>
        </div>
        <h1>Nominee</h1>
        <h1>Nominee</h1>
        <h1>Nominee</h1>
    </div>
);

export default NomineesPage;