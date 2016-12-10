import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { handleRequest } from '../helpers/handleRequest';
import * as actions from '../actions/movies';

export function* getMovies() {
  try {
    const res = yield call(handleRequest, 'https://facebook.github.io/react-native/movies.json');
    yield put(actions.moviesSuccess(res.movies || []));
  } catch (e) {
    yield put(actions.moviesFailure(e.response ? e.response.message : null));
  }
}

export function* moviesSaga() {
  yield* takeEvery(actions.MOVIES_REQUEST, getMovies);
}
