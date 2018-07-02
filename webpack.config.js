const webpack = require('webpack');

// let config = {
//   entry: './public/game.js',
//   output: './build/index.js'
// }

// module.exports = config;

module.exports = {
  entry: './public/game.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  }
};