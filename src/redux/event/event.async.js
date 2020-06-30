import {
    fetchStart,
    fetchFailure,
    setEventsSuccess,
    setPositionsSuccess,
    setNomineesSuccess
} from './event.actions';
import { db } from '../../firebase/firebase.utils';

const fetcher = (collection, setter) => (
    async dispatch => {
        //this will make the spinner show on the page
        dispatch(fetchStart());
        try {
            //getting the collection from db
            const snapshot = await db.collection(collection).get();
            // passing the data to the store
            dispatch(setter(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
        } catch (error) {
            //passing the error to the store
            dispatch(fetchFailure(error))
        }
    }
);
export const fetchEventsAsync = () => (
    fetcher('events', setEventsSuccess)
);

export const fetchPositionsAsync = () => (
    fetcher('positions', setPositionsSuccess)
);

export const fetchNomineesAsync = () => (
    fetcher('nominees', setNomineesSuccess)
);