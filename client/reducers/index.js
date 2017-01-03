import { combineReducers } from 'redux';

import moviesReducer from './movies';
import secretReducer from './secret';

export default combineReducers({
  movies: moviesReducer,
  secret: secretReducer,
});
