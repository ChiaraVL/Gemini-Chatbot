import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // Set the mode to 'development' or 'production'
  entry: './frontend/js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Add publicPath for dev server
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
    new Dotenv(), // Add this plugin
  ],
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "util": path.resolve('node_modules/util/'), // Use path.resolve to include util
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000, // You can change the port if needed
  },
};
