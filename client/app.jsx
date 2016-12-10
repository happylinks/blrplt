// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, ServerRouter, Match } from 'react-router';

import { Layout } from 'components';
import { Movies } from 'containers';

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
        <Match pattern="*" component={Movies} />
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
