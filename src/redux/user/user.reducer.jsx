import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    showPop: false
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload,
                showPop: false
            };
        case userActionTypes.POP_SHOW:
            return {
                ...state, 
                showPop: !state.showPop 
            };
        default:
            return state;
    }
}

export default userReducer;