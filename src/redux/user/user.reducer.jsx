import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: {},
    events: null,
    positions: null,
    nominee: null,
    showSignInSignOut: false,
    isOnLoginForm: true
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload,
                showSignInSignOut: false
            };
        case userActionTypes.SET_USER_EVENTS:
            return {
                ...state, 
                events: action.payload,
                showSignInSignOut: false
            };
        case userActionTypes.SET_USER_POSITIONS:
            return {
                ...state, 
                positions: action.payload,
                showSignInSignOut: false
            };
        case userActionTypes.FORM_SWITCH:
            return {
                ...state, 
                isOnLoginForm: !state.isOnLoginForm
            };
        case userActionTypes.SHOW_SIGNIN_SIGNOUT:
            return {
                ...state, 
                showSignInSignOut: !state.showSignInSignOut
            };
        default:
            return state;
    }
}

export default userReducer;