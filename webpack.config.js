const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    // 'babel-polyfill',
    './client/client.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/static/',
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
        enforce: 'pre',
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },

      { test: /\.css$/, loaders: ['style', 'css-loader'] },
      { test: /\.gql(\?.*)?$/, loader: 'raw-loader' },
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      isBrowser: JSON.stringify(true),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
  ],
  devtool: 'eval',
};
