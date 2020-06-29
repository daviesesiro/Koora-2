import { userActionStart, userActionFailure, setCurrentUserSuccess } from './user.actions';
import { getCurrentUser } from '../../firebase/firebase.utils';

//function to set the user object to the store
export const setCurrentUserAsync = () => (
    async (dispatch) => {
        dispatch(userActionStart());
        try {
            const userAuth = await getCurrentUser();
            const user = userAuth ? { email: userAuth.email, userId: userAuth.uid } : null;
            dispatch(setCurrentUserSuccess(user));
        } catch (error) {
            dispatch(userActionFailure(error));
        }
    }
);