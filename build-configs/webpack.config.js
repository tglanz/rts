module.exports = {
  entry: {
    client: "./src/client/entry.js",
    server: "./src/server/entry.js"
  },

  resolve: {
    root: ['./src']
  },

  output: {
    path: './build',
    filename: '[name].js'
  },

  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  }
}
