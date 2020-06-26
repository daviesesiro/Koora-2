import eventActionTypes from './event.types';

export const setEvents = (events) => ({
    type: eventActionTypes.SET_EVENTS,
    payload: events
});

export const setPositions = (positions) => ({
    type: eventActionTypes.SET_POSITIONS,
    payload: positions
});

export const setNominees = (nominees) => ({
    type: eventActionTypes.SET_NOMINEES,
    payload: nominees
});

export const showModal = () => ({
    type: eventActionTypes.SHOW_MODAL
});