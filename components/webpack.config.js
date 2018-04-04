const webpack = require('webpack');
const path = require('path');

const SOURCE_DIR = "./";
const DIST_DIR = "../website/static/dist";

module.exports = {
  cache: true,
  entry: {
      'messages': path.resolve(SOURCE_DIR, 'messages'),
      'styles': path.resolve(SOURCE_DIR, 'styles'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(DIST_DIR, 'js'),
  },
  plugins:[
    new webpack.DefinePlugin({
      SOCKET_URI: "'" + (process.env.SOCKET_URI) + "'",
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(SOURCE_DIR, 'manifest.json'), // ok maybe this is ok
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false, // lets keep that shit small
    //   comments: false, // lmao no
    //   compress: {
    //     warnings: false, // goddammit this is awful
    //   },
    //   debug: true, // for now TODO
    //   sourceMap: true, // for dev TODO
    // }),
    // new webpack.optimize.DedupePlugin() // don't use except in prod
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.resolve(SOURCE_DIR),
        query: {
          presets: ['env', 'react', 'es2016', 'stage-3']
        }
      },
      {
        test: /.(sass|scss)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ]
  }
};