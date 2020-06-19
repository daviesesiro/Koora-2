import { createSelector } from 'reselect';

const selectEvent = state => state.event;

const selectEvents = createSelector(
    [selectEvent],
    event => event.events
);