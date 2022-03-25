const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const fileLoader = require('./loaders/file');
const cssLoader = require('./loaders/css');
const jsLoader = require('./loaders/js');

module.exports = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  externals: [nodeExternals()],
  // Tell webpack the root file of our
  // server application
  entry: './src/server.tsx',
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      components: path.resolve(__dirname, 'src/components/'),
      config: path.resolve(__dirname, 'src/config/'),
      game: path.resolve(__dirname, 'src/game/'),
      store: path.resolve(__dirname, 'src/store/'),
      types: path.resolve(__dirname, 'src/types/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};
