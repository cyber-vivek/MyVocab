import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import authReducer from './authenticationReducer';
import { testReducer } from './testReducer';

export default combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  test: testReducer,
});
