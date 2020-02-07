const path = require('path');
module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
     rules: [
        {
          test: /\.jsx$/,
          use: [
            'babel-loader'
          ],
        },
     ],
  },
};