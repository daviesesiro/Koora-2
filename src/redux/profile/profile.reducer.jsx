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
    isAddEventBtnDisabled: false,
    isAddPositionBtnDisabled: false,
    isAddNomineeBtnDisabled: false,
    addEventProgress: 0,
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
                isAddEventBtnDisabled: false,
                isAddPositionBtnDisabled: false,
                errorMessage: action.payload
            };
        case profileActionTypes.ADD_USER_EVENT_START:
        case profileActionTypes.ADD_USER_POSITION_START:
        case profileActionTypes.ADD_USER_NOMINEE_START:
            return {
                ...state,
                isAddEventBtnDisabled: true,
                isAddPositionBtnDisabled: true,
                isAddNomineeBtnDisabled: true
            }
        case profileActionTypes.ADD_USER_EVENT_SUCCESS:
            return {
                ...state,
                isAddEventBtnDisabled: false,
                events: [...state.events, action.payload],
                addEventProgress: 0
            }
        case profileActionTypes.ADD_USER_POSITION_SUCCESS:
            return {
                ...state,
                isAddPositionBtnDisabled: false,
                positions: {
                    ...state.positions,
                    data: [...state.positions.data, action.payload]
                }
            }
        case profileActionTypes.ADD_USER_NOMINEE_SUCCESS:
            return {
                ...state,
                isAddNomineeBtnDisabled: false,
                nominees: {
                    createdBy: action.payload.createdBy,
                    data: [...state.nominees.data, ...action.payload.data]
                }
            }
        case profileActionTypes.DELETE_POSITION_SUCCESS:
            return {
                ...state,
                positions: {
                    ...state.positions,
                    data: state.positions.data.filter(d=> d.id!==action.payload)
                }
            }
        case profileActionTypes.UPDATE_ADD_EVENT_PROGRESS:
            return {
                ...state,
                addEventProgress: action.payload,
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