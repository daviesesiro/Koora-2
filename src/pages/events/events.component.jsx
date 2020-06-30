import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchEventsAsync } from '../../redux/event/event.async';
import { selectEvents, selectIsFetching } from '../../redux/event/event.selector';

import { ReactComponent as RefreshSvg } from '../../svgicon/refresh.svg';
import Spinner from '../../components/spinner/spinner.component';
import FormInput from '../../components/form-input/form-input.component';
import EventItem from '../../components/event-item/event-item.component';
import './events.styles.scss';
import { Link } from 'react-router-dom';
class EventsPage extends React.Component{
    state = {
        searchField: ''
    }

    componentDidMount() {
        const { events, fetchEventsAsync } = this.props;
        if(!events){
            fetchEventsAsync()
        }
    }

    handleChange = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }

    render() {
        const { events,match, isFetching, fetchEventsAsync} = this.props; 
        
        return (
            <div className="events-page">
                <div className='event-content-all'>  
                    <div className='top-content'>
                        <RefreshSvg onClick={()=>fetchEventsAsync()} className='refresh-svg'/>
                        <div className='search'>                        
                            <FormInput
                                handleChange={(e) => this.handleChange(e)}
                                label="Search Events..."
                                value={this.state.searchField} />
                        </div>
                    </div>    
                    {(isFetching)? <Spinner />
                    :
                        <div className='event-items'>
                            {
                                events && events.map(({ id, ...otherProps }) => {
                                    return(
                                        <Link to={`${match.path}/${id}`} key={id} >
                                            <EventItem {...otherProps} />
                                        </Link>)
                                })
                            }
                        </div>                    
                    }
                </div>
        
            </div>
        );
        
    }
}

const mapStateToProps = createStructuredSelector({
    events: selectEvents,
    isFetching : selectIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchEventsAsync: () => dispatch(fetchEventsAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);