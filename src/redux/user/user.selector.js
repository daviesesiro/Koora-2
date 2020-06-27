import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser? user.currentUser:null
);

export const selectUserEvents = createSelector(
    [selectUser],
    user => user.events ? user.events : []
);

export const selectUserPositions = createSelector(
    [selectUser],
    user => user ? user.positions : []
);

export const selectIsOnLoginForm = createSelector(
    [selectUser],
    user => user.isOnLoginForm
);
export const selectSignInSignOut = createSelector(
    [selectUser],
    user => user.showSignInSignOut
);