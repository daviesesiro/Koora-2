import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import PositionItem from '../../components/position-item/position-item.component';

import './profile-event-position.styles.scss';

class ProfileEventPositionPage extends React.Component{
    state = {
        loading: true
    }

    componentDidMount() {
        
    }

    render() {
        const { history, match } = this.props;
        return (
            <div className='profile-event-page'>
                <div className='top-content'>
                    <NavBack className='nav-back' onClick={()=> history.goBack()}/>
                    <h1 className='position-event-name'>Positions</h1>
                </div>
            

                <div className='position-items'>
                {
                    [].map(({id, ...otherProps}) =>(
                        <PositionItem handleClick={()=>history.push(`${match.path}/${id}`)} key={id} {...otherProps} />
                    ))
                }
                </div>
            </div>
        )
    }
}

export default connect()(ProfileEventPositionPage);