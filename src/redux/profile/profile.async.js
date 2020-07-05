import { db, storage } from '../firebase.utils';
import { singleFetcher } from "../async.utils";
import {
	fetchUserEventsStart,
	fetchUserEventsSuccess,
	profileActionFailure,
	fetchUserPositionsStart,
	fetchUserPositionsSuccess,
	fetchUserNomineesSuccess,
	fetchUserNomineesStart,
	addUserEventStart,
	addUserEventSuccess,
	updateAddEventProgress,
	addUserPositionStart,
	addUserPositionSuccess,
	deletePositionSuccess,
	addUserNomineeSuccess,
	addUserNomineeStart
} from './profile.actions';
import {
	toggleAddModal
} from '../modal/modal.actions';

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
export const fetchUserPositionsAsync = ({ currentUser: { userId, email }, eventId }) => (
	async dispatch => {
		dispatch(fetchUserPositionsStart());
		try {
			const eSnapshot = await db.doc(`events/${eventId}`).get();
			const eventName = eSnapshot.exists ? eSnapshot.data().name : null;
			document.title = `Koora | ${email} | ${eventName} Positions`;
			const pSnapshot = await db.collection('positions')
				.where('eventId', '==', `${eventId}`)
				.where('userId', '==', `${userId}`).get();
			const createdBy = eSnapshot.exists ? eSnapshot.data().userId : null;
			dispatch(fetchUserPositionsSuccess({
				createdBy,
				eventName,
				data: pSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			}));
		} catch (error) {
			dispatch(profileActionFailure(error))
		}
	}
);

export const fetchUserNomineesAsync = ({ userId, eventId, positionId }) => (
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
			const positionName = eMp ? pSnapshot.data().name : null;

			dispatch(fetchUserNomineesSuccess({
				createdBy,
				positionName,
				data: nSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			}));
			return 'done';
		} catch (error) {
			dispatch(profileActionFailure(error))
		}
	}
);

export const addEventAsync = (userId, eventName, file, date) => (
	async dispatch => {
		dispatch(addUserEventStart());
		try {
			if (!eventName || !file || !date) {
				throw new Error('Please fill up the form')
			}
			if (file.size / 1000 > 350) {
				throw new Error('Please upload an image less than 350Kb');
			}
			var fileName = file.name.toLowerCase();
			if (!(fileName.endsWith('jpg') || fileName.endsWith('png')) || fileName.endsWith('jpeg')) {
				throw new Error('Please upload an accepted file format');
			}
			var eventImgRef = storage.ref().child(`events/${new Date().getTime()}${file.name}`);
			var uploadTask = eventImgRef.put(file);

			var unsubscribe = uploadTask.on('state_changed', (snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				dispatch(updateAddEventProgress(progress));
			}, error => {
				dispatch(profileActionFailure(error));
			}, async () => {
				const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
				const newEvent = {
					userId: userId,
					imageUrl: downloadUrl,
					start_at: new Date(),
					end_at: date,
					name: eventName
				}
				const eSnapshot = await db.collection('events').add(newEvent);

				dispatch(addUserEventSuccess({ ...newEvent, id: eSnapshot.id }));
				dispatch(toggleAddModal());
				unsubscribe();
			});
		} catch (error) {
			dispatch(profileActionFailure(error));
		}
	}
)

export const addPositionAsync = ({ userId, eventId, positionName }) => (
	async dispatch => {
		dispatch(addUserPositionStart())
		try {
			if (!userId || !eventId || !positionName) {
				throw new Error("Please fill up the fields")
			}
			const totalVotes = 0;
			const newPosition = { name: positionName, userId, eventId, totalVotes }
			const pSnapshot = await db.collection('positions').add(newPosition);
			dispatch(addUserPositionSuccess({ ...newPosition, id: pSnapshot.id }));
			dispatch(toggleAddModal());
		} catch (error) {
			dispatch(profileActionFailure(error))
		}

	}
);

export const addNomineeAsync = ({ nomineeName, userId, positionId, eventId, file }) => (
	async dispatch => {
		dispatch(addUserNomineeStart());
		try {
			if (!nomineeName) {
				throw new Error('Please fill up the form')
			}
			if (file && (file.size / 1000 > 350)) {
				throw new Error('Please upload an image less than 350Kb');
			}
			var downloadUrl = ''; var newNominee;
			if (!file) {
				downloadUrl = '/bitmap.png';
				newNominee = {
					createdBy: userId,
					userId,
					imageUrl: downloadUrl,
					name: nomineeName,
					positionId,
					eventId,
					votes: 0
				}
				const nSnapshot = await db.collection('nominees').add(newNominee);

				dispatch(addUserNomineeSuccess({ ...newNominee, id: nSnapshot.id }));
				return dispatch(toggleAddModal());
			}

			var fileName = file.name.toLowerCase();

			if (!(fileName.endsWith('jpg') || fileName.endsWith('png')) || fileName.endsWith('jpeg')) {
				throw new Error('Please upload an accepted file format');
			}

			var nomineeImgRef = storage.ref().child(`nominees/${new Date().getTime()}${file.name}`);
			var uploadTask = nomineeImgRef.put(file);

			var unsubscribe = uploadTask.on('state_changed', (snapshot) => (
				null
			), error => {
				dispatch(profileActionFailure(error));
			}, async () => {
				downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
				newNominee = {
					userId: userId,
					imageUrl: downloadUrl,
					name: nomineeName,
					positionId,
					eventId,
					votes: 0
				}
				const nSnapshot = await db.collection('nominees').add(newNominee);

				dispatch(addUserNomineeSuccess({ ...newNominee, createdBy: userId, id: nSnapshot.id }));
				dispatch(toggleAddModal());
				unsubscribe();
			});

		} catch (error) {
			dispatch(profileActionFailure(error));
		}
	}
)

export const deletePositionAsync = (id) => (
	async dispatch => {
		let success = true;
		try {
			await db.collection('positions').doc(id).delete();
			dispatch(deletePositionSuccess(id));
		} catch (error) {
			dispatch(profileActionFailure(error))
			success = false;
		}
		return success;
	}
)