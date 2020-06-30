import eventActionTypes from './event.types';

const INITIAL_STATE = {
    events: null,
    positions: null,
    nominees: null,
    isFetching: false,
    errorMessage: ''
};

export const eventReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case eventActionTypes.FETCH_START:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };        
        case eventActionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };        
        case eventActionTypes.SET_EVENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                events: action.payload,
                errorMessage: ''
            };       
        case eventActionTypes.SET_POSITIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                positions: action.payload,
                errorMessage: ''
            };       
        case eventActionTypes.SET_NOMINEES_SUCCESS:
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

export default eventReducer;