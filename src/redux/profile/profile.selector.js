import { createSelector } from 'reselect';

const selectProfile = state => state.profile;

export const selectUserEvents = createSelector(
    [selectProfile],
    profile => profile.events
);

export const selectUserPositions = createSelector(
    [selectProfile],
    profile => profile.positions
);

export const selectUserNominees = createSelector(
    [selectProfile],
    profile => profile.nominees
);

export const selectErrorMessage = createSelector(
    [selectProfile],
    profile => profile.errorMessage
);

export const selectIsAddEventBtnDisabled = createSelector(
    [selectProfile],
    profile => profile.isAddEventBtnDisabled
);

export const selectIsFetching = createSelector(
    [selectProfile],
    profile => profile.isFetching
);
export const selectAddEventProgress = createSelector(
    [selectProfile],
    profile => profile.addEventProgress
);