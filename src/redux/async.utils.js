import { db } from './firebase.utils';

export const fetcher = (start, collection, setter, fail) => (
    async dispatch => {
        //this will make the spinner show on the page
        dispatch(start());
        try {
            //getting the collection from db
            const snapshot = await db.collection(collection).get();
            // passing the data to the store
            dispatch(setter(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
        } catch (error) {
            //passing the error to the store
            dispatch(fail(error))
        }
    }
);

export const singleFetcher = (start, collection, field, id, setter, fail, eventName) => {
    return async dispatch => {
        //this will make the spinner show on the page
        dispatch(start());
        try {
            // document.title = `Koora | ${eventName} | ${collection}`
            //getting the collection from db
            const snapshot = await db.collection(collection).where(`${field}`, '==', `${id}`).get();
            // passing the data to the store
            dispatch(setter(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
        } catch (error) {
            //passing the error to the store
            dispatch(fail(error))
        }
    }
};

export const single2Fetcher = (start, collection, field, id, field2, id2, setter, fail) => {
    return async dispatch => {
        //this will make the spinner show on the page
        dispatch(start());
        try {
            //getting the collection from db
            const snapshot = await db.collection(collection)
                .where(`${field}`, '==', `${id}`)
                .where(`${field2}`, '==', `${id2}`)
                .get();
            // passing the data to the store
            dispatch(setter(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
        } catch (error) {
            //passing the error to the store
            dispatch(fail(error))
        }
    }
};