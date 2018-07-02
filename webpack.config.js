const webpack = require('webpack');

module.exports = {
  entry: './public/game.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  }
};