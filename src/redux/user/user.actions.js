import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setUserEvents = (events) => ({
    type: UserActionTypes.SET_USER_EVENTS,
    payload: events
});

export const setUserPositions = (positions) => ({
    type: UserActionTypes.SET_USER_POSITIONS,
    payload: positions
});

export const showPop = () => ({
    type: UserActionTypes.POP_SHOW
});