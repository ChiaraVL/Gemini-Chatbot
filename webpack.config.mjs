import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';

// Load environment variables from .env file
const env = dotenv.config().parsed;

// Create an object for Webpack's DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

export default {
  entry: './frontend/js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "util": require.resolve("util/") // Add fallback for util
    }
  }
};
