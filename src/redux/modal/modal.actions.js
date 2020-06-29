import modalActionTypes from './modal.types';

export const toggleAddModal = () => ({
    type: modalActionTypes.SHOW_ADD_MODAL
});

export const toggleSignInSignUp = () => ({
    type: modalActionTypes.SHOW_SIGIN_SIGNOUT_FORM
});