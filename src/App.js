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
import Spinner from './components/spinner/spinner.component';

import './App.css';

class App extends React.Component{
  state = {
    loading: true
  }

  unsubscribe = null;
  componentDidMount() {
    const { setUser } = this.props;

    auth.onAuthStateChanged(user => {      
      const newUser = user ? { email: user.email, userId: user.uid } : null;
      console.log(newUser);
      setUser(newUser);
      this.setState({loading: false})
    });
  }
  render() {
    if(this.state.loading) return <Spinner/>
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
