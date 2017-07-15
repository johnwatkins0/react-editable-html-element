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
        exclude: [/modules/],
        use: styleCSSExtractor.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.scss$/,
        include: [/modules/],
        use: styleCSSExtractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },
  target: 'web',
  plugins: [styleCSSExtractor],
};

export default [main, docs];
