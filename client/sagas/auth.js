import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { post } from '../helpers/handleRequest';
import * as actions from '../actions/auth';

export function* doLogin(action) {
  try {
    const res = yield call(post, 'http://localhost:3001/sessions/create', action.payload);
    yield put(actions.loginSuccess(res.id_token));
  } catch (e) {
    console.log(e);
    yield put(actions.loginFailure(e.response ? e.response.message : null));
  }
}

export function* doLogout() {
  try {
    yield call(post, 'http://localhost:3001/sessions/destroy', {});
    yield put(actions.logoutSuccess());
  } catch (e) {
    console.log(e);
    yield put(actions.logoutFailure(e.response ? e.response.message : null));
  }
}

export function* authSaga() {
  yield [
    takeEvery(actions.LOGIN_REQUEST, doLogin),
    takeEvery(actions.LOGOUT_REQUEST, doLogout),
  ];
}
