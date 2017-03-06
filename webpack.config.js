module.exports = {
  entry: "./client/pokemania.js",
  output: {
  	filename: "./client/bundle.js"
  },
  module: {
   loaders: [
     {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map'
};
