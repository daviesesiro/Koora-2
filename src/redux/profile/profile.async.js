import { db } from '../firebase.utils';
import { singleFetcher } from "../async.utils";
import { fetchUserEventsStart, fetchUserEventsSuccess, profileActionFailure, fetchUserPositionsStart, fetchUserPositionsSuccess, fetchUserNomineesSuccess, fetchUserNomineesStart } from './profile.actions';

export const fetchUserEventsAsync = (userId) => (
	singleFetcher(
		fetchUserEventsStart,
		"events",
		"userId",
		userId,
		fetchUserEventsSuccess,
		profileActionFailure
	)
);
export const fetchUserPositionsAsync = (userId, eventId) => (
	async dispatch => {
		dispatch(fetchUserPositionsStart());
		try {
			const pSnapshot = await db.collection('positions')
				.where('eventId', '==', `${eventId}`)
				.where('userId', '==', `${userId}`).get();
			const eSnapshot = await db.doc(`events/${eventId}`).get();
			const createdBy = eSnapshot.exists ? eSnapshot.data().userId : null;
			console.log(eSnapshot.exists);
			dispatch(fetchUserPositionsSuccess({
				createdBy: createdBy,
				data: pSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			}));
			return 'done';
		} catch (error) {
			dispatch(profileActionFailure(error))
		}
	}
);

export const fetchUserNomineesAsync = (userId, eventId, positionId) => (
	async dispatch => {
		dispatch(fetchUserNomineesStart());
		try {
			const nSnapshot = await db.collection('nominees')
				.where('positionId', '==', `${positionId}`)
				.where('userId', '==', `${userId}`).get();
			const eSnapshot = await db.doc(`events/${eventId}`).get();
			const pSnapshot = await db.doc(`positions/${positionId}`).get();

			//checking if both event and position exists
			const exists = eSnapshot.exists && pSnapshot.exists;
			//check if they both match
			const eMp = exists ? eSnapshot.data().userId === pSnapshot.data().userId : false;
			//setting createdBy
			const createdBy = eMp ? eSnapshot.data().userId : null;

			dispatch(fetchUserNomineesSuccess({
				createdBy: createdBy,
				data: nSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			}));
			return 'done';
		} catch (error) {
			dispatch(profileActionFailure(error))
		}
	}
);
