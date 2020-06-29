import UserActionTypes from './user.types';

export const userActionStart = () => ({
    type: UserActionTypes.USER_ACTION_START
});

export const userActionFailure = (error) => ({
    type: UserActionTypes.USER_ACTION_FAILURE,
    payload: error.message
});

export const setCurrentUserSuccess = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER_SUCCESS,
    payload: user
});

export const setUserEventsSuccess = (events) => ({
    type: UserActionTypes.SET_USER_EVENTS_SUCCESS,
    payload: events
});

export const setUserPositionsSuccess = (positions) => ({
    type: UserActionTypes.SET_USER_POSITIONS_SUCCESS,
    payload: positions
});

export const setUserNomineesSuccess = (nominees) => ({
    type: UserActionTypes.SET_USER_POSITIONS,
    payload: nominees
});

