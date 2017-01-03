// @flow
// System.import polyfill for server-side render.
if (typeof System === "undefined") {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, ServerRouter, Match } from 'react-router';

import {
  Movies,
  Hello,
} from './asyncRoutes';
import { Layout } from 'components';

type Props = {
  context?: Object,
  location?: Object,
  store: Object,
  type: string,
}

class Blrplt extends React.Component { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    const { context, location, store, type } = this.props;

    // Declare your routes here.
    const layout = (
      <Layout>
        <Match pattern="/movies" component={Movies} />
        <Match pattern="/hello" component={Hello} />
      </Layout>
    );

    return (
      <Provider store={store}>
        {type === 'client' ? (
          <BrowserRouter>
            {layout}
          </BrowserRouter>
        ) : (
          <ServerRouter context={context} location={location}>
            {layout}
          </ServerRouter>
        )}
      </Provider>
    );
  }
}

export default Blrplt;
