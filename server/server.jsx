import 'babel-polyfill';
import path from 'path';
import http from 'http';

import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'express-jwt';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createServerRenderContext } from 'react-router';

import fetchDefaults from 'fetch-defaults';
require('es6-promise').polyfill();
require('isomorphic-fetch');

import configureStore from '../client/store';
import { Html } from '../client/components';
import App from '../client/app';
import rootSaga from '../client/sagas';

const serverless = process.env.SERVERLESS;

let awsServerlessExpressMiddleware;
if (serverless) {
  awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
}


/*
HET PLAN:

Login:
Browser -> Proxy -> API
Api geeft token terug, Proxy vangt die en stopt hem in cookie

Normale call:
Browser -> API (met token in cookie)

Logout:
Browser -> Proxy -> Delete token from cookie
*/

const manifest = require('../build/manifest.json');

const renderHTML = (markup, store) => {
  const html = renderToStaticMarkup(
    <Html markup={markup} manifest={manifest} store={store} />
  );
  return `${html}`;
};

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (awsServerlessExpressMiddleware) {
  app.use(awsServerlessExpressMiddleware.eventContext());
}

app.use('/public', express.static(path.join(__dirname, '/public')));

app.post('/login', (req, res) => {
  const jsonBody = JSON.stringify(req.body);
  const clientRequest = http.request({
    host: 'localhost',
    port: 3001,
    path: '/sessions/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(jsonBody),
    },
  }, (callres) => {
    callres.setEncoding('utf8');
    callres.on('data', (chunk) => {
      const body = JSON.parse(chunk);
      const jwtToken = body.id_token;
      const token = `Bearer ${jwtToken}`;
      res.cookie('authorization', token, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.status(200).json({ status: 'ok' });
    });
  });
  clientRequest.write(jsonBody);
  clientRequest.end();
});

app.post('/logout', (req, res) => {
  res.clearCookie('authorization');
  res.status(200).json({ status: 'ok' });
});

app.get('*', (req, res) => {
  global.fetch = fetchDefaults(global.fetch, {
    headers: {
      Authorization: req.cookies.authorization,
      Cookie: `authorization=${req.cookies.authorization};`,
    },
  });

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

  // When first render is done and all saga's are run, render again with updated store.
  store.runSaga(rootSaga).done.then(() => {
    const markup = renderToString(rootComp);
    const html = renderHTML(markup, store);

    const result = context.getResult();
    if (result.redirect) {
      res.redirect(302, result.redirect.pathname);
    } else if (result.missed) {
      res.status(404).send(html);
    } else {
      res.status(200).send(html);
    }
  });

  // Do first render, starts initial actions.
  renderToString(rootComp);

  // When the first render is finished, send the END action to redux-saga.
  store.close();
});

if (!serverless) {
  console.log('listening on port 3000');
  app.listen(3000);
}

export default app;
