import eventActionTypes from './event.types';

const INITIAL_STATE = {
    events: null,
    positions: null,
    nominees: null
};

export const eventReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case eventActionTypes.SET_EVENTS:
            return {...state,  events: action.payload };
        
        case "SET_POSITION":
            return {...state,  positions: action.payload };
        
        case "SET_NOMINEES":
            return {...state,  nominees: action.payload };
        
        default:
            return state;
    }
}

export default eventReducer;