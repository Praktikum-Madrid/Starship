module.exports = {
  client: {
    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    use: 'url-loader',
    type: 'asset/resource',
  },
};
