import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Define __filename y __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // Configura el modo en 'development' o 'production'
  entry: './frontend/js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Añade publicPath para el servidor de desarrollo
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(), // Añade este plugin
    new HtmlWebpackPlugin({
      template: './frontend/html/index.html', // Ruta a tu archivo HTML de plantilla
      filename: 'index.html', // Nombre del archivo HTML generado
    }),
  ],
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "util": path.resolve('node_modules/util/'), // Usa path.resolve para incluir util
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000, // Puedes cambiar el puerto si es necesario
  },
};
