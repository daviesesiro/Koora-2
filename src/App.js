import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideNav from './components/side-nav/side-nav.component';
import BottomNav from './components/bottom-nav/bottom-nav.component';
import AboutPage from './pages/about/about.component';
import HomePage from './pages/home/home.component';
import EventPage from './pages/event/event.component';
import './App.css';

class App extends React.Component{

  render() {
    
    return (
      <div className='app'>
        <div className='content'>
        <SideNav/>
        <BottomNav/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/about' component={AboutPage}/>
            <Route path='/' component={EventPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
