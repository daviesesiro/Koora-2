import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth} from './firebase/firebase.utils';
import { showSignSignOut, setCurrentUser, switchForm } from './redux/user/user.actions';
import { selectSignInSignOut, selectIsOnLoginForm } from './redux/user/user.selector';

import SideNav from './components/side-nav/side-nav.component';
import MobileNav from './components/mobile-nav/mobile-nav.component';
import AboutPage from './pages/about/about.component';
import HomePage from './pages/home/home.component';
import EventPage from './pages/event/event.component';
import ProfilePage from './pages/profile/profile.component';
import Spinner from './components/spinner/spinner.component';

import './App.css';
import { Modal } from './components/modal/modal.component';
import { SignInSignUp } from './components/SignIn-SignUp/SignIn-SignUp.component';
import { createStructuredSelector } from 'reselect';

class App extends React.Component{
  state = {
    loading: true
  }

  unsubscribe = null;
  componentDidMount() {
    const { setUser } = this.props;

    this.unsubscribe = auth.onAuthStateChanged(user => {      
      const newUser = user ? { email: user.email, userId: user.uid } : null;
      setUser(newUser);
      this.setState({loading: false})
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { toggleSignSignOut, signInSignOutState, switchSignInSignOut, IsOnLoginForm } = this.props;
    if(this.state.loading) return <Spinner/>
    return (
      <div id='top' className='app'>
        <div className='content'>          
          <SideNav />
          <MobileNav />
        <Modal modalState={signInSignOutState} toggleModal={toggleSignSignOut}>
            <SignInSignUp switcher={switchSignInSignOut} IsOnLoginForm={IsOnLoginForm}/>
        </Modal>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/about' component={AboutPage}/>
              <Route path='/events' component={EventPage}/>
              <Route path='/profile' component={ProfilePage}/>
              </Switch>
        </div>
      </div> 
    );
  }
}
const mapDispatchToProps = dispatch => ({
  toggleSignSignOut: () => dispatch(showSignSignOut()),
  setUser: (user) => dispatch(setCurrentUser(user)),
  switchSignInSignOut: () => dispatch(switchForm()),
});
const mapStateToProps = createStructuredSelector({
  signInSignOutState: selectSignInSignOut,
  IsOnLoginForm: selectIsOnLoginForm
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
