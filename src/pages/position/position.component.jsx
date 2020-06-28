import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { db } from '../../firebase/firebase.utils';
import { setPositions } from '../../redux/event/event.actions';
import { selectPositions } from '../../redux/event/event.selector';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import Spinner from '../../components/spinner/spinner.component';
import PositionItem from '../../components/position-item/position-item.component';

import './position.styles.scss';
import { Link } from 'react-router-dom';
class PositionsPage extends React.Component{    
    state = {
        loading: true,
    }

    getData = async() => {
        this.setState({loading:true});
        const { match, setPosition } = this.props;
        db.collection('positions').where('eventId', '==', `${match.params.eventId}`).get().then((snapshot) => {   
            setPosition(snapshot.docs.map(doc=>({id: doc.id, ...doc.data()})));
            this.setState({loading:false});
        });
    }
    componentDidMount(){
        this.getData();
    }

    render() {
        const { history, positions, match } = this.props;

        if (this.state.loading) return <Spinner />
        
        return (
            <div className='position-page'>
                <div className='top-content'>
                    <NavBack className='nav-back' onClick={()=> history.push('/events')}/>
                    <h1 className='position-event-name'>Positions</h1>
                </div>

                <div className='position-items'>
                    {
                        positions.map(({id, ...otherProps}) =>(
                            <Link key={id} to={`${match.url}/${id}`}>
                                <PositionItem {...otherProps} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        );        
    }
}
const mapStateToProps = createStructuredSelector({
    positions: selectPositions
});

const mapDispatchToProps = dispatch => ({
    setPosition: (positions) => dispatch(setPositions(positions)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionsPage);