const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = () => {

  const config = {
    entry: {
      'scripts/application.js': './src/application.js',
      'scripts/vendors.js': './src/vendors.js',
      fonts: ['./src/scss/fonts.scss'],
      styles: ['./src/scss/styles.scss'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new UglifyJsPlugin({test: /\.js(\?.*)?$/i,})
      ],
    },

    output: {
      path: path.resolve(__dirname, '../assets/'),
      filename: '[name]'
    },


    plugins: [
      new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({filename: 'css/[name].css'}),
      new CleanWebpackPlugin(),
      new RemovePlugin({
        after: {
          root: '../assets',
          include: ['fonts', 'styles'],
         // trash: true
        }
      })

    ],

    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../', esModule: true}},
            {loader: 'css-loader', options: { sourceMap: true, importLoaders: 1}},
            {loader: 'sass-loader', options: { sourceMap: true }},
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {outputPath: 'images/', name: '[name].[ext]'},
        },
        {
          test: /\.(woff|woff2)(\?.*)?$/,
          use: {
            loader: 'file-loader',
            options: { outputPath: 'fonts/', name: '[name].[ext]'}
          },
        },

      ]
    },
  };
  return config;
};
