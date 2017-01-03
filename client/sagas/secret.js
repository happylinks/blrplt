import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { handleRequest } from '../helpers/handleRequest';
import * as actions from '../actions/secret';

export function* getSecret() {
  try {
    const res = yield call(handleRequest, 'http://localhost:3001/api/protected/random-quote', { text: true });
    yield put(actions.secretSuccess(res || []));
  } catch (e) {
    yield put(actions.secretFailure(e.response ? e.response.message : null));
  }
}

export function* secretSaga() {
  yield* takeEvery(actions.SECRET_REQUEST, getSecret);
}
