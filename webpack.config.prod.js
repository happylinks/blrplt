const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const S3Plugin = require('webpack-s3-plugin');

const config = require('./config/main');

module.exports = function (env) {
  const webpackConfig = {
    entry: {
      app: [
        './client/client.jsx',
      ],
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'public/[name].[chunkhash].js',
      publicPath: config.cdn,
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
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
          }),
        },
        { test: /\.gql(\?.*)?$/, loader: 'raw-loader' },
        { test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=public/img/[hash].[ext]' },
        { test: /\.json$/, loader: 'json-loader' },
        {
          test: /\.(eot|ttf|woff|woff2|svg)$/,
          loader: 'file?name=public/fonts/[name].[ext]',
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new webpack.DefinePlugin({
        isBrowser: JSON.stringify(false),
        __env: JSON.stringify(),
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new ExtractTextPlugin('public/bundle.[contenthash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'public/vendor.[chunkhash].js',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new ManifestPlugin(),
    ],
    devtool: 'source-map',
    stats: {
      children: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  };

  if (!env.noDeploy) {
    webpackConfig.plugins.push(new S3Plugin({
      directory: 'build',
      s3Options: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: env.region,
      },
      s3UploadOptions: {
        Bucket: env.bucket,
      },
      cacheOptions: {
        cacheControl: 'max-age=315360000, no-transform, public',
      },
    }));
  }

  return webpackConfig;
};
