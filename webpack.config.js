module.exports = {
  entry: "./client/pokemania.js",
  output: {
  	filename: "./client/bundle.js"
  },
  module: {
   loaders: [
     {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map'
};
