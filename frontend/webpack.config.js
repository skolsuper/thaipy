module.exports = {
  context: __dirname + "/src",
  entry: "./index.ts",
  output: {
    path: __dirname + "/../dist",
    filename: "app.js"
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ng-annotate!awesome-typescript'},
      {test: /\.scss$/, loader: 'style!css!sass'},
    ]
  },
  devServer: {
    contentBase: 'src'
  },
  devtool: 'cheap-source-map',
  node: {
    fs: "empty",
    tls: "empty",
  }
};
