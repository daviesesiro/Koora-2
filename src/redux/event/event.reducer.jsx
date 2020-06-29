import eventActionTypes from './event.types';

const INITIAL_STATE = {
    events: [],
    positions: [],
    nominees: []
};

export const eventReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case eventActionTypes.SET_EVENTS:
            return {
                ...state,
                events: action.payload
            };        
        case eventActionTypes.SET_POSITIONS:
            return {
                ...state,
                positions: action.payload
            };        
        case eventActionTypes.SET_NOMINEES:
            return {
                ...state,
                nominees: action.payload
            };        
        default:
            return state;
    }
}

export default eventReducer;