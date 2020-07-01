import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: {},
    isFetching: false,
    isSignInBtnDisabled: false,
    isSignUpBtnDisabled: false,
    isSignOutBtnDisabled: false,
    errorMessage: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.USER_ACTION_START:        
            return {
                ...state,
                isFetching: true
            };
        case userActionTypes.USER_ACTION_FAILURE:
            return {
                ...state,
                isFetching: false,                
                isSignInBtnDisabled: false,
                isSignUpBtnDisabled: false,
                isSignOutBtnDisabled: false,
                errorMessage: action.payload
            };
        case userActionTypes.SET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentUser: action.payload,
                errorMessage: ''
            };
        //Making the sign in button disabled
        case userActionTypes.USER_SIGNIN_START:
            return {
                ...state,
                isSignInBtnDisabled: true
            }
        //Adding the user to the store
        case userActionTypes.USER_SIGNIN_SUCCESS:
        case userActionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isSignInBtnDisabled: false,
                isSignUpBtnDisabled: false,
                errorMessage: ''            
            }
            case userActionTypes.USER_SIGNUP_START:
            return {
                ...state,
                isSignUpBtnDisabled: true
            }
        // resetting the all types of fetching to false
        case userActionTypes.USER_SIGNOUT_START:
            return {
                ...state, 
                isSignOutBtnDisabled: true
            };
        case userActionTypes.USER_SIGNOUT_SUCCESS:
            return {
                ...state, 
                currentUser: null,
                errorMessage: ''
            };
        default:
            return state;
    }
}

export default userReducer;