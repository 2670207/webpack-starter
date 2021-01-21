const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = () => {

  const config = {
    entry: {
      application: './src/application.js',
      vendors: './src/vendors.js',
      fonts: ['./src/scss/fonts.scss'],
      styles: ['./src/scss/global.scss'],
    },
    optimization: {
      minimize: true,
      minimizer: [
       // new CssMinimizerPlugin(),
      ],
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/../assets',
      publicPath: '',
    },


    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({filename: 'css/[name].css'})
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
