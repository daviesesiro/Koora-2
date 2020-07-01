import { getCurrentUser, db, auth } from '../firebase.utils';
import {
	userActionStart,
	userActionFailure,
	setCurrentUserSuccess,
	signOutStart,
	signOutSuccess,
	userSignInStart,
	userSignInSuccess,
	userSignUpStart,
	userSignUpSuccess,
} from "./user.actions";
import { toggleSignInSignUp } from '../modal/modal.actions';
import { clearProfileData } from '../profile/profile.actions';

//function to set the user object to the store
export const setCurrentUserAsync = () => async (dispatch) => {
	dispatch(userActionStart());
	try {
		const userAuth = await getCurrentUser();
		const userSnapshot = userAuth ? await db.doc(`users/${userAuth.uid}`).get() : null;
		const user = userAuth
			? { userId: userSnapshot.id, ...userSnapshot.data() }
			: null;
		dispatch(setCurrentUserSuccess(user));
	} catch (error) {
		dispatch(userActionFailure(error));
	}
	return 'done';
};

export const SignOutUserAsync = () => (
	async dispatch => {
		dispatch(signOutStart());
		try {
			await auth.signOut();
			dispatch(signOutSuccess());
			dispatch(clearProfileData());
		} catch (error) {
			dispatch(userActionFailure(error));
		}
	}
);

export const signInUserAsync = (email, password) => (
	async dispatch => {
		dispatch(userSignInStart())

		try {
			const { user } = await auth.signInWithEmailAndPassword(email, password);
			const userSnapshot = await db.doc(`users/${user.uid}`).get();
			const currentUser = { userId: userSnapshot.id, ...userSnapshot.data() };
			dispatch(userSignInSuccess(currentUser));
			dispatch(toggleSignInSignUp());
		} catch (error) {
			dispatch(userActionFailure(error))
		}
	}
)
export const signUpUserAsync = (email, password, confirmPassword) => (
	async dispatch => {
		dispatch(userSignUpStart())

		try {
			if (password !== confirmPassword) {
				throw new Error('Passwords do not match');
			}
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			const userSnapshot = await db.doc(`users/${user.uid}`).get();
			const currentUser = { userId: userSnapshot.id, ...userSnapshot.data() };
			dispatch(userSignUpSuccess(currentUser));
			dispatch(toggleSignInSignUp());
		} catch (error) {
			dispatch(userActionFailure(error))
		}
	}
)