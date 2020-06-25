import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';

import ProfileOverview from '../profile-overview/profile-overview.component';
import ProfileEventPositionPage from '../profile-event-position/profile-event-position.component' ;

import './profile.styles.scss';
import { Redirect, Switch, Route } from 'react-router-dom';

const ProfilePage = ({currentUser}) => {
    if (currentUser) {                      
        return(
            <Switch>
                <Route exact path='/profile' component={ProfileOverview}/>
                <Route exact path='/profile/:eventId' component={ProfileEventPositionPage}/>
            </Switch>
            );
        } else {
            return <Redirect to='/'/>
        }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


export default connect(mapStateToProps)(ProfilePage);