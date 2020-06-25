import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { db } from '../../firebase/firebase.utils';

import {selectCurrentUser } from '../../redux/user/user.selector';

import { ReactComponent as NavBack } from '../../svgicon/back.svg';
import PositionItem from '../../components/position-item/position-item.component';
import Spinner from '../../components/spinner/spinner.component';

import './profile-event-position.styles.scss';

class ProfileEventPositionPage extends React.Component{
    state = {
        loading: true,
        positions: null
    }

    componentDidMount() {
        this.setState({ loading: true });
        const { match, currentUser } = this.props;
        db.collection('positions').where('eventId', '==', `${match.params.eventId}`)
            // .where('userId', '==', `${currentUser.userId}`)
            .get().then(snapshot => {
                this.setState({ positions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
                console.log(this.state.positions);
                this.setState({ loading: false });
        });
    }
    render() {
        const { history, match, currentUser } = this.props;
        const { positions } = this.state;
        if (this.state.loading) return <Spinner />
        
        return (
            <div className='profile-event-page'>
                <div className='top-content'>
                    <NavBack className='nav-back'
                        onClick={() => history.push(`/profile`)} />
                    <h1 className='p-position-event-name'>Positions</h1>
                </div>
                {this.state.positions.some(pos => pos.userId === currentUser.userId) ?
                    <div className='btn-container'>
                        <div className='btn add'>Add Position</div>
                        <div className='btn delete'>Toggle delete</div>
                    </div>
                    :null
                }
                <div className='p-position-items'>
                {
                    positions.map(({id, ...otherProps}) =>(
                        <PositionItem handleClick={()=>history.push(`${match.url}/${id}`)} key={id} {...otherProps} />
                    ))
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ProfileEventPositionPage);