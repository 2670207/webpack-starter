const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, '../assets/'),
  assets: '',
  public: './'
}

if (!fs.existsSync(PATHS.dist)){
  fs.mkdirSync(PATHS.dist);
}
const isCleanFilesProject = !fs.readdirSync(PATHS.dist).includes('webpack');
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {

  externals: {
    paths: PATHS
  },
  entry: {
    application: PATHS.src,
    vendors: `${PATHS.src}/vendors.js`,
   //module_name_space:  `${PATHS.src}/module_name_space/page.js`, //подключение отдельных модулей
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: PATHS.public
  },
  optimization: {
    splitChunks: {
    //  chunks: 'all',
    //  name: false,
    },
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, 
     {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        context: PATHS.src,
        name: 'fonts/[name].[ext]',
        publicPath: '../',
      }
    }, 
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: PATHS.src,
        publicPath: '../../',
      }
    }, 
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, 
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        },
      ]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, 
      ]
    }]
  },
  resolve: {
    alias: {
      'images': PATHS.src + '/' + PATHS.assets + 'images', 
      '~': PATHS.src,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

  ],
}

if(!isProduction){
  module.exports.devtool ='source-map';
}

if(isCleanFilesProject){
  module.exports.plugins.push(new CleanWebpackPlugin()) //protection from delete src file
}

