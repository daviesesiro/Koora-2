import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    events: null,
    positions: null,
    nominees: null,
    isFetching: false,
    errorMessage: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.USER_ACTION_START:
            return {
                ...state,
                isFetching: true,
                errorMessage:''
            };
        case userActionTypes.USER_ACTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessge: action.payload
            };

        case userActionTypes.SET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentUser: action.payload,
                errorMessage:''
            };
        case userActionTypes.SET_USER_EVENTS_SUCCESS:
            return {
                ...state, 
                events: action.payload,
                errorMessage:''
            };

        case userActionTypes.SET_USER_POSITIONS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                positions: action.payload,
                errorMessage: ''
            };

        case userActionTypes.SET_USER_NOMINEES_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                nominees: action.payload,
                errorMessage: ''
            };
        default:
            return state;
    }
}

export default userReducer;