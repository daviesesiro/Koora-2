import React from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase/firebase.utils';

import Spinner from '../../components/spinner/spinner.component';
import PositionItem from '../../components/position-item/position-item.component';

import './position.styles.scss';
class PositionsPage extends React.Component{    
    state = {
        loading: true,
    }

    getData = () => {
        this.setState({loading:true});
        const { match, setPosition } = this.props;
        const positions = [];
        db.collection('positions').where('eventId', '==', `${match.params.eventId}`).get().then((snapShot) => {
            snapShot.docs.forEach(position => {
                positions.push({id: position.id, ...position.data() })
            });            
            setPosition(positions);
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
                <h1 onClick={()=>this.getData()}>.........remout......</h1>
                <span onClick={()=> history.goBack()}>{'<<<<'}</span>
                <h1 className='position-event-name'>First Event of the year</h1>
                <div className='position-items'>
                    {
                        positions.map(({id, ...otherProps}) =>(
                            <PositionItem handleClick={()=>history.push(`${match.url}/${id}`)} key={id} {...otherProps} />
                        ))
                    }
                </div>
            </div>
        );        
    }
}
const mapStateToProps = (state) => ({
    positions: state.event.positions
});

const mapDispatchToProps = dispatch => ({
    setPosition: (positions) => dispatch({type:"SET_POSITION", payload:positions}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionsPage);