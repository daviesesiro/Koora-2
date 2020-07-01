import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCurrentUser } from '../../redux/user/user.selector';

import ProfileOverview from '../profile-overview/profile-overview.component';
import ProfilePositionPage from '../profile-position/profile-position.component' ;
import ProfileNomineePage from '../profile-nominee/profile-nominee.component' ;

import './profile.styles.scss';
import {Switch, Route } from 'react-router-dom';
// import Spinner from '../../components/spinner/spinner.component';
// import SignInSignUp from '../../components/SignIn-SignUp/SignIn-SignUp.component';
import { toggleSignInSignUp } from '../../redux/modal/modal.actions';


const ProfilePage = ({ currentUser}) => {
    if (currentUser) {                      
        return(
            <Switch>
                <Route exact path='/profile' component={ProfileOverview}/>
                <Route exact path='/profile/:eventId' component={ProfilePositionPage}/>
                <Route exact path='/profile/:eventId/:positionId' component={ProfileNomineePage}/>
            </Switch>
            );
        } else {
        return (<h1>Please Log in</h1> )
        }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatch = dispatch => ({
    toggleSignInSignUp: ()=>dispatch(toggleSignInSignUp())
})

export default connect(mapStateToProps, mapDispatch)(ProfilePage);