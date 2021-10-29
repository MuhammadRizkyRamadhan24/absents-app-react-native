import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth';
import users from './users';
import absents from './absents';
import dailys from './dailys';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  users,
  absents,
  dailys
});

export default rootReducer;