var webpack = require('webpack');
var path = require('path');
var json = require('json-loader')

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: {
    index: APP_DIR + '/index.js',
    // yelp: APP_DIR + '/YelpResultContainer.jsx',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  module : {
    loaders : [
      { test: /\.json$/, 
        loader: "json-loader" 
      },
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'app/ui/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    outputPath: BUILD_DIR,
    historyApiFallback: true,
},
  node: {
     console: true,
     fs: 'empty',
     net: 'empty',
     tls: 'empty'
   }

};

module.exports = config;