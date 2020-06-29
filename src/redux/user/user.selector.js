import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser ? user.currentUser : null
);

export const selectUserEvents = createSelector(
    [selectUser],
    user => user.events ? user.events : []
);

export const selectUserPositions = createSelector(
    [selectUser],
    user => user.positions ? user.positions : []
);

export const selectUserNominees = createSelector(
    [selectUser],
    user => user.nominees ? user.nominee : []
);

export const selectErrorMessage = createSelector(
    [selectUser],
    user => user.errorMessage
);
export const selectIsFetching = createSelector(
    [selectUser],
    user => user.isFetching
);