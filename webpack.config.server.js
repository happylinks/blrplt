const fs = require('fs');

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = function (env) {
  const webpackConfig = {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    entry: [
      './server/server.jsx',
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      library: '[name]',
      libraryTarget: 'commonjs2',
      filename: 'server.js',
    },
    resolve: {
      alias: {
      },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'client'),
      ],
      extensions: [
        '*',
        '.js',
        '.json',
        '.jsx',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'isomorphic-style-loader',
            'css-loader?importLoaders=2&sourceMap',
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
        { test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=public/img/[hash].[ext]' },
        { test: /\.json$/, loader: 'json-loader' },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        isBrowser: JSON.stringify(false),
        'process.env.SERVERLESS': env ? env.serverless : false,
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new CopyWebpackPlugin([
        { from: 'server/lambda.js', to: 'lambda.js' },
        { from: 'server/node_modules', to: 'node_modules' },
      ]),
    ],
    devtool: 'source-map',
  };

  return webpackConfig;
};
