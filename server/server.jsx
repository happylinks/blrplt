import 'babel-polyfill';
import path from 'path';

import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createServerRenderContext } from 'react-router';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import configureStore from '../client/store';
import { Html } from '../client/components';
import App from '../client/app';
import rootSaga from '../client/sagas';

const manifest = require('../build/manifest.json');

const renderHTML = (markup, store) => {
  const html = renderToStaticMarkup(
    <Html markup={markup} manifest={manifest} store={store} />
  );
  return `${html}`;
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  const store = configureStore();
  const context = createServerRenderContext();

  const rootComp = (
    <App
      location={req.originalUrl}
      context={context}
      store={store}
      type="server"
    />
  );

  store.runSaga(rootSaga).done.then(() => {
    const markup = renderToString(rootComp);
    const html = renderHTML(markup, store);

    const result = context.getResult();
    if (result.redirect) {
      res.writeHead(301, {
        Location: result.redirect.pathname,
      });
      res.end();
    } else if (result.missed) {
      res.writeHead(404);
    }

    res.write(html);
    res.end();
  });

  store.close();
});

// app.listen(3000);

export default app;
