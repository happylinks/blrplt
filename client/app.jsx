// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, ServerRouter, Match } from 'react-router';

import { Layout, Hello } from 'components';

type Props = {
  context: Object,
  store: Object,
  location: Object,
  type: String,
}

class Blrplt extends React.Component { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    const { context, location, store, type } = this.props;

    const layout = (
      <Layout>
        <Match pattern="*" component={Hello} />
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
