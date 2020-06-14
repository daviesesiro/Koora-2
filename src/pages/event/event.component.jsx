import React from 'react';

import { Switch, Route } from 'react-router-dom';
import EventsPage from '../events/events.component';
import PositionsPage from '../position/position.component';
import NomineesPage from '../nominee/nominee.component';
import './event.styles.scss';
const Event = () => (
    <div className="event">
        <Switch>
            <Route exact path='/events' component={EventsPage}/>
            <Route exact path='/events/:eventId' component={PositionsPage} />
            <Route path='/events/:eventId/:positionId' component={NomineesPage} />
        </Switch>
    </div>
);

export default Event;