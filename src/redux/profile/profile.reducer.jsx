import pofileActionTypes from './profile.types';
import profileActionTypes from './profile.types';

const INITIAL_STATE = {
    events: [],
    positions: {
        createdBy: null,
        data:[]
    },
    nominees: {
        createdBy: null,
        data:[]
    },
    isFetching: false,
    isAddEventBtnDisabled:false,
    errorMessage: null
}

export const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case pofileActionTypes.FETCH_USER_EVENTS_START:      
        case profileActionTypes.FETCH_USER_POSITIONS_START:    
        case profileActionTypes.FETCH_USER_NOMINEES_START:    
            return {
                ...state,
                isFetching: true
            };
        case pofileActionTypes.FETCH_USER_EVENTS_SUCCESS:        
            return {
                ...state,
                isFetching: false,
                events: action.payload
            };
        case pofileActionTypes.FETCH_USER_POSITIONS_SUCCESS:   
            return {
                ...state,
                isFetching: false,
                positions: { createdBy:action.payload.createdBy, data: action.payload.data }
            };
        case pofileActionTypes.FETCH_USER_NOMINEES_SUCCESS:   
            return {
                ...state,
                isFetching: false,
                nominees: { createdBy:action.payload.createdBy, data: action.payload.data }
            };
        case pofileActionTypes.PROFILE_ACTION_FAILURE:        
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case profileActionTypes.ADD_USER_EVENT_START:
            return {
                ...state,
                isAddEventBtnDisabled: true
            }
        case pofileActionTypes.CLEAR_PROFILE_DATA:        
            return {
                ...state,
                events: [],
                positions: {},
                nominees: {},
                errorMessage: action.payload
            };
        default:
            return state;
    }
}

export default profileReducer;