import { createSelector } from 'reselect';

const selectModal = (state) => state.modal;

export const selectAddModal = createSelector(
    [selectModal],
    modal => modal.showAddModal
);

export const selectSignInSignUp = createSelector(
    [selectModal],
    modal => modal.showSignInSignUp
); 