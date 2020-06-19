import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectUserEvents = createSelector(
    [selectUser],
    user => user.events
);

export const selectPop = createSelector(
    [selectUser],
    user => user.showPop
);