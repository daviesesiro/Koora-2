import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectPositions, selectIsFetching } from '../../redux/event/event.selector';
import { fetchPositionsAsync } from '../../redux/event/event.async';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Spinner from '../../components/spinner/spinner.component';
import PositionItem from '../../components/position-item/position-item.component';

import './position.styles.scss';
class PositionsPage extends React.Component{    
    componentDidMount() {
        const { fetchPositionsAsync, match } = this.props;
        const eventId = match.params.eventId;
        console.log(eventId);
        fetchPositionsAsync(eventId);
    }

    render() {
        const { history,isFetching, positions, match } = this.props;

        if (isFetching) return <Spinner />
        
        return (
            <div className='position-page'>
                <div className='top-content'>
                    <NavBack className='nav-back' onClick={()=> history.push('/events')}/>
                    <h1 className='position-event-name'>Positions</h1>
                </div>
                {(isFetching) ? <Spinner />
                    :
                    <div className='position-items'>
                        {
                            positions&&positions.map(({ id, ...otherProps }) => (
                                <Link key={id} to={`${match.url}/${id}`}>
                                    <PositionItem {...otherProps} />
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
        );        
    }
}
const mapStateToProps = createStructuredSelector({
    positions: selectPositions,
    isFetching: selectIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchPositionsAsync: (eventId) => dispatch(fetchPositionsAsync(eventId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionsPage);