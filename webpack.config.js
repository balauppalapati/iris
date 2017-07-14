const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

const nodeOpts = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: true,
  __dirname: true
};

const outDir = path.resolve(__dirname, 'dist');

module.exports = {
  resolve: {
    extensions: ['.js'],
  },
  entry: './server/server.js',
  output: {
    path: outDir,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: outDir
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      mangle: true
    })
  ],
  target: 'node',
  node: nodeOpts,
  externals: nodeModules,
}
