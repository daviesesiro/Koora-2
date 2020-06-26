import { createSelector } from 'reselect';

const selectEvent = state => state.event;

export const selectEvents = createSelector(
    [selectEvent],
    event => event.events
);

export const selectPositions = createSelector(
    [selectEvent],
    event => event.positions
);

export const selectNominees = createSelector(
    [selectEvent],
    event => event.nominees
);

export const selectModal = createSelector(
    [selectEvent],
    event => event.showModal
);