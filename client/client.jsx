// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import WrappedRedBox from 'components/WrappedRedBox';

import App from './app';
import configureStore from './store';
import rootSaga from './sagas';

const store = configureStore(
  window.__INITIAL_STATE__  // eslint-disable-line no-underscore-dangle
);

store.runSaga(rootSaga);

ReactDOM.render(
  (<AppContainer errorReporter={WrappedRedBox}>
    <App
      store={store}
      type="client"
    />
  </AppContainer>),
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;

    ReactDOM.render(
      (<AppContainer errorReporter={WrappedRedBox}>
        <NextApp
          store={store}
          type="client"
        />
      </AppContainer>)
    , document.getElementById('app'));
  });
}
