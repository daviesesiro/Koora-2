import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';

const persistConfig = {
    key:'root',
    storage,
    whitelist:['event', 'user']
}

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer
});


export default persistReducer(persistConfig, rootReducer);