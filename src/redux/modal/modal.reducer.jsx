import modalActionTypes from "./modal.types"

const initialState = {
    showAddModal: false,
    showSignInSignUp: false
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {

        case modalActionTypes.SHOW_ADD_MODAL:
            return {
                ...state,
                showAddModal: !state.showAddModal
            }
        case modalActionTypes.SHOW_SIGIN_SIGNOUT_FORM:
            return {
                ...state,
                showSignInSignUp: !state.showSignInSignUp
            }
        default:
            return state
    }
}

export default modalReducer;
