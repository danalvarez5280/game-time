const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
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
