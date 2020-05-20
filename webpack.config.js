module.exports = {
  entry: [
    "./assets/js/main.js"
  ],
  output: {
    path: __dirname + "/dist/assets/js",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};
