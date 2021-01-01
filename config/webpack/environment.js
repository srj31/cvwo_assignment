const { environment } = require('@rails/webpacker')

const webpack = require("webpack") 

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

environment.loaders.append('typescript', {
  test: /.(ts|tsx)$/,
  loader: 'ts-loader'
});

module.exports = environment;