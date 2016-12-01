import React from 'react';

const Helmet = require('react-helmet');

const config = require('../../config/main');

const resolve = (files, props) => files.map((src) => {
  if (!props.manifest[src]) { return null; }
  return config.cdn + props.manifest[src];
}).filter(file => file !== undefined);

type Props = {
  markup: string,
  store: Object,
};

const Html = (props: Props) => {
  const head = Helmet.rewind();
  const { markup, store } = props;

  const styles = resolve(['vendor.css', 'app.css'], props);
  const renderStyles = styles.map((src, i) =>
    <link key={i} rel="stylesheet" type="text/css" href={src} />
  );

  const scripts = resolve(['vendor.js', 'app.js'], props);
  const renderScripts = scripts.map((src, i) =>
    <script src={src} key={i} />
  );

  const initialState = (
    <script
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: `window.__INITIAL_STATE__=${JSON.stringify(store ? store.getState() : {})};`,
      }}
      charSet="UTF-8"
    />
  );

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {renderStyles}
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: markup }} // eslint-disable-line react/no-danger
        />
        {initialState}
        {renderScripts}
      </body>
    </html>
  );
};

export default Html;
