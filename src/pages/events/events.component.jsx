import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { db } from '../../firebase/firebase.utils';
import { setEvents } from '../../redux/event/event.actions';
import { selectEvents } from '../../redux/event/event.selector';

import { ReactComponent as RefreshSvg } from '../../svgicon/refresh.svg';
import Spinner from '../../components/spinner/spinner.component';
import FormInput from '../../components/form-input/form-input.component';
import EventItem from '../../components/event-item/event-item.component';
import './events.styles.scss';
class EventsPage extends React.Component{
    state = {
        loading: true,
        searchField: ''
    }

    getData() {
        this.setState({loading:true})
        const {setEvents } = this.props;    
        let events = [];
        db.collection('events').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                events.push({id: doc.id, ...doc.data() });
            })
            setEvents(events);
            this.setState({loading:false});
        });     
    }
    componentDidMount() {
        const { pageEvents } = this.props;
        if(!pageEvents)
            this.getData();
        
        this.setState({loading:false});
    }

    handleChange = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }
    handleClick = (eventId) => {
        const { history, match } = this.props;
        history.push(`${match.path}/${eventId}`)
    }

    render() {
        const { pageEvents } = this.props; 

        if (this.state.loading) return (<Spinner/>)
        
        return (
            <div className="events-page">
                <div className='event-content-all'>  
                    <div className='top-content'>
                        <RefreshSvg onClick={()=> this.getData()} className='refresh-svg'/>
                        <div className='search'>                        
                            <FormInput handleChange={(e)=>this.handleChange(e)} label="Search Events..." value={this.state.searchField} />
                        </div>
                    </div>    

                    <div className='event-items'>
                        {
                            pageEvents && pageEvents.map(({ id, ...otherProps }) => {
                                return <EventItem key={id} {...otherProps} handleClick={() => this.handleClick(id)} />
                            })
                        }
                    </div>
                </div>
        
            </div>
        );
        
    }
}

const mapStateToProps = createStructuredSelector({
    pageEvents: selectEvents
});

const mapDispatchToProps = dispatch => ({
    setEvents: (events) => dispatch(setEvents(events))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);