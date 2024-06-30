import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import authReducer from './authenticationReducer';

export default combineReducers({
  loader: loaderReducer,
  auth: authReducer
});
