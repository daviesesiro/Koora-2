import profileActionTypes from './profile.types';

export const profileActionFailure = (error) => ({
    type: profileActionTypes.PROFILE_ACTION_FAILURE,
    payload: error.message
});

//FETCH_USER_EVENTS
export const fetchUserEventsStart = () => ({
    type: profileActionTypes.FETCH_USER_EVENTS_START
});
export const fetchUserEventsSuccess = (events) => ({
    type: profileActionTypes.FETCH_USER_EVENTS_SUCCESS,
    payload: events
});
//END FETCH_USER_EVENTS


//FETCH_USER_POSITIONS
export const fetchUserPositionsStart = () => ({
    type: profileActionTypes.FETCH_USER_POSITIONS_START
});
export const fetchUserPositionsSuccess = (positions) => ({
    type: profileActionTypes.FETCH_USER_POSITIONS_SUCCESS,
    payload: positions
});
// END FETCH_USER_POSITIONS


//FETCH_USER_NOMINEE
export const fetchUserNomineesStart = () => ({
    type: profileActionTypes.FETCH_USER_NOMINEES_START
});
export const fetchUserNomineesSuccess = (nominees) => ({
    type: profileActionTypes.FETCH_USER_NOMINEES_SUCCESS,
    payload: nominees
});
//END FETCH_USER_NOMINEE


//CLEAR_PROFILE_DATA
export const clearProfileData = () => ({
    type: profileActionTypes.CLEAR_PROFILE_DATA
})
//END CLEAR_PROFILE_DATA


// ADD_USER_EVENT
export const addUserEventStart = () => ({
    type: profileActionTypes.ADD_USER_EVENT_START
});
export const addUserEventSuccess = (event) => ({
    type: profileActionTypes.ADD_USER_EVENT_SUCCESS,
    payload: event
})
// END ADD_USER_EVENT


// ADD_USER_NOMINEE
export const addUserNomineeStart = () => ({
    type: profileActionTypes.ADD_USER_NOMINEE_START
});
export const addUserNomineeSuccess = (nominee) => ({
    type: profileActionTypes.ADD_USER_NOMINEE_SUCCESS,
    payload: nominee
})
// END ADD_USER_NOMINEE


// ADD_USER_POSITION
export const addUserPositionStart = () => ({
    type: profileActionTypes.ADD_USER_POSITION_START
});
export const addUserPositionSuccess = (position) => ({
    type: profileActionTypes.ADD_USER_POSITION_SUCCESS,
    payload: position
});
// END ADD_USER_POSITION


//UPDATE_EVENT_PROGRESS_BAR
export const updateAddEventProgress = (progress) => ({
    type: profileActionTypes.UPDATE_ADD_EVENT_PROGRESS,
    payload: progress
});
//END UPDATE_EVENT_PROGRESS_BAR


// DELETE_USER_POSITION
export const deletePositionStart = () => ({
    type: profileActionTypes.DELETE_POSITION_START
});
export const deletePositionSuccess = (id) => ({
    type: profileActionTypes.DELETE_POSITION_SUCCESS,
    payload: id
});
// END DELETE_USER_POSITION