import {
    fetchStart,
    fetchFailure,
    setEventsSuccess,
    setPositionsSuccess,
    setNomineesSuccess,
} from "./event.actions";

import { fetcher, singleFetcher, single2Fetcher } from "../async.utils";

export const fetchEventsAsync = () =>
    fetcher(fetchStart, "events", setEventsSuccess, fetchFailure);

export const fetchPositionsAsync = (eventId) =>
    singleFetcher(
        fetchStart,
        "positions",
        "eventId",
        eventId,
        setPositionsSuccess,
        fetchFailure
    );

export const fetchNomineesAsync = (eventId, positionId) =>
    single2Fetcher(
        fetchStart,
        "nominees",
        "eventId",
        eventId,
        "positionId",
        positionId,
        setNomineesSuccess,
        fetchFailure
    );
