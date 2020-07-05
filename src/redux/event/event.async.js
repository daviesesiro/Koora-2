import {
    fetchStart,
    fetchFailure,
    setEventsSuccess,
    setPositionsSuccess,
    setNomineesSuccess,
    voteNomineeFailure,
} from "./event.actions";

import { fetcher, single2Fetcher } from "../async.utils";
import Axios from "axios";
import { toast } from "react-toastify";
import { toggleSignInSignUp } from "../modal/modal.actions";
import { db } from "../firebase.utils";

export const fetchEventsAsync = () => {
    return (
        fetcher(fetchStart, "events", setEventsSuccess, fetchFailure)
    );
}
export const fetchPositionsAsync = (eventId) => {
    return async dispatch => {
        //this will make the spinner show on the page
        dispatch(fetchStart());
        try {
            const eventName = (await db.collection('events').doc(eventId).get()).data().name
            document.title = `Koora | ${eventName} Positions`
            //getting the collection from db
            const snapshot = await db.collection('positions').where(`eventId`, '==', `${eventId}`).get();
            // passing the data to the store
            dispatch(setPositionsSuccess(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
        } catch (error) {
            //passing the error to the store
            dispatch(fetchFailure(error))
        }
    }
}

export const fetchNomineesAsync = (eventId, positionId) => {
    db.collection('positions').doc(positionId).get().then(snapshot => {
        const positionName = snapshot.data().name;
        db.collection('events').doc(eventId).get().then((eSnapshot) => {
            const eventName = eSnapshot.data().name;

            document.title = `Koora | ${eventName} Event | ${positionName} Nominees`
        })
    })
    return single2Fetcher(
        fetchStart,
        "nominees",
        "eventId",
        eventId,
        "positionId",
        positionId,
        setNomineesSuccess,
        fetchFailure,
    );
}


export const voteNomineeAsync = ({ e, currentUser, positionId, nomineeId }) => (
    async dispatch => {
        e.persist();
        if (!currentUser) {
            dispatch(toggleSignInSignUp());
        }
        try {
            e.target.innerHTML = "Voting";
            e.target.disabled = true;
            e.target.parentNode.parentNode.nextSibling.style.display = 'block';
            console.log(e.target.parentNode.parentNode.nextSibling);
            const dataObj = { userId: currentUser.userId, nomineeId: nomineeId, positionId }
            const res = await Axios.post('https://us-central1-koora-e1eb5.cloudfunctions.net/voteNominee', dataObj);
            e.target.disabled = false;
            e.target.innerHTML = 'Vote';
            e.target.parentNode.parentNode.nextSibling.style.display = 'none';
            toast.info(res.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            dispatch(voteNomineeFailure(error))
        }
    }
);
