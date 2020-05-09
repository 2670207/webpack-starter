const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');

module.exports = () => {
  const config = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      filename: './js/app.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /\.pug$/,
          loaders: ['html-loader', 'pug-html-loader?pretty'],
        },
        {
          test: /\.(png|jpg|jpeg|gif?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader',
          options: {
            esModule: false,
            outputPath: 'images',
            publicPath: '../images/',
          },
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader',
          options: {
            esModule: false,
            outputPath: 'fonts',
            publicPath: '../fonts/',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: './css/style.css' }),
    ],
  };

  // pug pages;
  const pugPages = glob.sync(path.join(__dirname, '/src/pug/pages/*.pug'));
  pugPages.forEach((_path) => {
    const filename = path.basename(_path, '.pug');

    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        template: `./src/pug/pages/${filename}.pug`,
      }),
    );
  });

  // html pages;
  const htmlPages = glob.sync(path.join(__dirname, '/src/html/*.html'));
  htmlPages.forEach((_path) => {
    const filename = path.basename(_path, '.html');

    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        template: `./src/html/${filename}.html`,
      }),
    );
  });

  return config;
};
