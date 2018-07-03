const webpack = require('webpack');

module.exports = {
  entry: './public/game.js',
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  devtool: 'source-map'
};