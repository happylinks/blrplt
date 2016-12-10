import { fork } from 'redux-saga/effects';

import { moviesSaga } from './movies';

export default function* root() {
  yield [
    fork(moviesSaga),
  ];
}
