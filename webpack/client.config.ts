import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import alias from './alias';

const serverConfig = {
  // Tell webpack the root file of our
  // server application
  entry: {
    bundle: './src/client.tsx',
    // ServiceWorker: './src/serviceWorker/serviceWorker.ts',
  },
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias,
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};

export default serverConfig;
