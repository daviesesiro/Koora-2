import {
    fetchStart,
    fetchFailure,
    setEventsSuccess,
    setPositionsSuccess,
    setNomineesSuccess,
    voteNomineeFailure,
} from "./event.actions";

import { fetcher, singleFetcher, single2Fetcher } from "../async.utils";
import Axios from "axios";
import { toast } from "react-toastify";
import { toggleSignInSignUp } from "../modal/modal.actions";

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


export const voteNomineeAsync = ({ e, currentUser, positionId, nomineeId }) => (
    async dispatch => {
        e.persist();
        if (!currentUser) {
            dispatch(toggleSignInSignUp());
        }
        try {
            e.target.innerHTML = "Voting";
            e.target.disabled = true;
            e.target.parentNode.nextSibling.style.display = 'block'
            const dataObj = { userId: currentUser.userId, nomineeId: nomineeId, positionId }
            const res = await Axios.post('https://us-central1-koora-e1eb5.cloudfunctions.net/voteNominee', dataObj);
            e.target.disabled = false;
            e.target.innerHTML = 'Vote';
            e.target.parentNode.nextSibling.style.display = 'none';
            toast.info(res.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            dispatch(voteNomineeFailure(error))
        }
    }
);
