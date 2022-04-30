import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import alias from './alias';

const serverConfig = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  // Tell webpack the root file of our
  // server application
  entry: './src/server/index.ts',
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
    alias,
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};

export default serverConfig;
