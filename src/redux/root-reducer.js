import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import modalReducer from './modal/modal.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['events']
}

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    modal: modalReducer
});


export default persistReducer(persistConfig, rootReducer);