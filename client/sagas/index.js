import { fork } from 'redux-saga/effects';

import { moviesSaga } from './movies';
import { secretSaga } from './secret';
import { authSaga } from './auth';

export default function* root() {
  yield [
    fork(moviesSaga),
    fork(secretSaga),
    fork(authSaga),
  ];
}
