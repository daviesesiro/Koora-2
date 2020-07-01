import UserActionTypes from './user.types';

export const userActionStart = () => ({
    type: UserActionTypes.USER_ACTION_START
});

export const userActionFailure = (error) => ({
    type: UserActionTypes.USER_ACTION_FAILURE,
    payload: error.message
});

export const userSignInStart = () => ({
    type: UserActionTypes.USER_SIGNIN_START
});

export const userSignInSuccess = (user) => ({
    type: UserActionTypes.USER_SIGNIN_SUCCESS,
    payload: user
});

export const userSignUpStart = () => ({
    type: UserActionTypes.USER_SIGNUP_START
});

export const userSignUpSuccess = (user) => ({
    type: UserActionTypes.USER_SIGNUP_SUCCESS,
    payload: user
});

export const signOutStart = () => ({
    type: UserActionTypes.USER_SIGNOUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.USER_SIGNOUT_SUCCESS
});

export const userOtherActionStart = () => ({
    type: UserActionTypes.USER_ACTION_OTHERS_START
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
