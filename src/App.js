import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth} from './firebase/firebase.utils';
import { showPop, setCurrentUser } from './redux/user/user.actions';

import SideNav from './components/side-nav/side-nav.component';
import MobileNav from './components/mobile-nav/mobile-nav.component';
import AboutPage from './pages/about/about.component';
import HomePage from './pages/home/home.component';
import EventPage from './pages/event/event.component';
import ProfilePage from './pages/profile/profile.component';
import CreatePop from './components/create-pop/create-pop.component';
import './App.css';

class App extends React.Component{
  unsubscribe = null;
  componentDidMount() {
    const { setUser } = this.props;

    this.unsubscribe = auth.onAuthStateChanged(user => {      
      const newUser = {email: user.email, userId: user.uid}
      setUser(newUser);
      this.unsubscribe()
    });
  }
  render() {

    return (
      <div id='top' className='app'>
        <div className='content'>
          <CreatePop/>
          <SideNav />
          <MobileNav />
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
  showPop: () => dispatch(showPop()),
  setUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
