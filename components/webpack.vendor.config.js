const webpack = require('webpack');
const path = require('path');

const SOURCE_DIR = './';
const DIST_DIR = '../website/static/dist';

module.exports = {
  entry: {
    'vendor': [
      'react',
      'react-dom',
      'axios',
      'socket.io-client',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
    ],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve(DIST_DIR, 'js'),
    library: 'vendor', // must match name apparently
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false, // lets keep that shit small
    //   comments: false, // lmao no
    //   compress: {
    //     warnings: false, // goddammit this is awful
    //   },
    //   // debug: true, // for now TODO
    //   // sourceMap: true, // for dev TODO
    // }),
    new webpack.DllPlugin({
      name: 'vendor', // must match library apparently
      path: path.resolve(SOURCE_DIR, 'manifest.json') // maybe name this better
    }),
  ]
};