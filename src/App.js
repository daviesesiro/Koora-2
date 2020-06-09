import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import AboutPage from './pages/about/about.component';
import HomePage from './pages/home/home.component';
import EventPage from './pages/event/event.component';
import './App.css';

class App extends React.Component{

  render() {
    
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/about' component={AboutPage}/>
          <Route path='/' component={EventPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
