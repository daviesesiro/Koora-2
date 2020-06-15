import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideNav from './components/side-nav/side-nav.component';
import MobileNaV from './components/mobile-nav/mobile-nav.component';
import LoginPopup from './components/login-popup/login-popup.component';
import AboutPage from './pages/about/about.component';
import HomePage from './pages/home/home.component';
import EventPage from './pages/event/event.component';
import ProfilePage from './pages/profile/profile.component';
import './App.css';

class App extends React.Component{

  render() {
    return (
      <div id='top' className='app'>
        <div className='content'>
          <LoginPopup/>
          <SideNav/>
          <MobileNaV/>
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

export default App;
