const path = require('path');

//see https://www.npmjs.com/package/webpack-node-externals
//var nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  externals: {
    "canvas": "Canvas"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpeg|jpg|ttf|gif)$/, loader: 'url-loader' },
      // { test: /\.(png|jpeg|jpg|ttf|gif)$/,
      //   use: [
      //     { loader: 'url-loader', options: {url: false} }
      //   ]
      // },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  }
};
