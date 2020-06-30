import eventActionTypes from './event.types';

export const fetchStart = () => ({
    type: eventActionTypes.FETCH_START
})

export const fetchFailure = (error) => ({
    type: eventActionTypes.FETCH_FAILURE,
    payload: error.message
})

export const setEventsSuccess = (events) => ({
    type: eventActionTypes.SET_EVENTS_SUCCESS,
    payload: events
});

export const setPositionsSuccess = (positions) => ({
    type: eventActionTypes.SET_POSITIONS_SUCCESS,
    payload: positions
});

export const setNomineesSuccess = (nominees) => ({
    type: eventActionTypes.SET_NOMINEES_SUCCESS,
    payload: nominees
});
