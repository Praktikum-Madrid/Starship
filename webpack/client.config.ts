import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import CopyWebpacPlugin from 'copy-webpack-plugin';

import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import alias from './alias';

const clientConfig = {
  mode: 'production',
  entry: {
    bundle: './src/client.tsx',
    // ServiceWorker: './src/serviceWorker/serviceWorker.ts',
  },
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  // devtool: 'inline-source-map', // Sourcemaps for development (remove on production)
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
  plugins: [
    new CopyWebpacPlugin({
      patterns: [
        { from: 'src/static', to: path.resolve(__dirname, '../public') },
      ],
    }),
  ],
};

export default clientConfig;
