import eventActionTypes from './event.types';

export const setEvents = (events) => ({
    type: eventActionTypes.SET_EVENTS,
    payload: events
});