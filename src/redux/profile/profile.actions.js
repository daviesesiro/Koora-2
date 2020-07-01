import profileActionTypes from './profile.types';

export const profileActionFailure = (error) => ({
    type: profileActionTypes.PROFILE_ACTION_FAILURE,
    payload: error.message
});

export const fetchUserEventsStart = () => ({
    type: profileActionTypes.FETCH_USER_EVENTS_START
})

export const fetchUserEventsSuccess = (events) => ({
    type: profileActionTypes.FETCH_USER_EVENTS_SUCCESS,
    payload: events
});

export const fetchUserPositionsStart = () => ({
    type: profileActionTypes.FETCH_USER_POSITIONS_START
})

export const fetchUserPositionsSuccess = (positions) => ({
    type: profileActionTypes.FETCH_USER_POSITIONS_SUCCESS,
    payload: positions
});
export const fetchUserNomineesStart = () => ({
    type: profileActionTypes.FETCH_USER_NOMINEES_START
})

export const fetchUserNomineesSuccess = (nominees) => ({
    type: profileActionTypes.FETCH_USER_NOMINEES_SUCCESS,
    payload: nominees
});

export const clearProfileData = () => ({
    type: profileActionTypes.CLEAR_PROFILE_DATA
})

export const addUserEventStart = () => ({
    type: profileActionTypes.ADD_USER_EVENT_START
})

export const addUserEventSuccess = (event) => ({
    type: profileActionTypes.ADD_USER_EVENT_START,
    payload: event
})

export const addUserNomineeStart = () => ({
    type: profileActionTypes.ADD_USER_NOMINEE_START
})

export const addUserNomineeSuccess = (nominee) => ({
    type: profileActionTypes.ADD_USER_NOMINEE_START,
    payload: nominee
})

export const addUserPositionStart = () => ({
    type: profileActionTypes.ADD_USER_POSITION_START
})

export const addUserPositionSuccess = (position) => ({
    type: profileActionTypes.ADD_USER_POSITION_SUCCESS,
    payload: position
})