import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const main = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015', 'stage-1'] },
          },
        ],
      },
    ],
  },
  target: 'web',
  devtool: 'source-maps',
};

const styleCSSExtractor = new ExtractTextPlugin('style.css');
const docs = {
  entry: {
    index: ['./docs/src/index.js', './docs/src/scss/main.scss'],
  },

  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015', 'stage-1'] },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: styleCSSExtractor.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  target: 'web',
  plugins: [styleCSSExtractor],
  devtool: 'source-maps',
};

export default [main, docs];
