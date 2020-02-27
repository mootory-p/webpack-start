const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fileOptions = {
  'css':['app.bundle.css'],
  'js':['app.bundle.js'],
  'chunks':{
    'head':{
      'entry':'',
      'css':'app.bundle.css'
    },
    'body':{
      'entry':'app.bundle.js',
      'css':''
    }
  }
};

module.exports = {
  entry: './src/assets/js/app.js',
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/app.bundle.js'
  },
  mode: 'development',
  devServer:{
    contentBase: __dirname + '/dist',
    port:3000
  },
  module: {
    rules: [
      {
        loader:'babel-loader',
        test:/\.js$/,
        exclude: /node_modules/
      },
//      {
//        test: /\.s?css$/,
//        use: ['style-loader','css-loader','sass-loader']
//      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader?url=false', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader?url=false', 'sass-loader']
        })
      },
      {

        test: /\.(gif|png|jpe?g|svg)$/i,
        use:[
          'file-loader?name=assets/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
          }
        ]
      },
    ]
  },


  plugins:[
    new CopyWebpackPlugin([
      {from: './src/assets/images', to: './assets/images/'}
    ]),

    new HtmlWebpackPlugin({
      filename:'index.html',
      template: 'src/index.html',
      'files' : fileOptions
    }),
    new HtmlWebpackPlugin({
      filename:'intro.html',
      template: 'src/intro.html',
      'files' : fileOptions
    }),

    new HtmlWebpackPlugin({
      filename:'intro.html',
      template: 'src/intro.html'
    }),
    new ExtractTextPlugin('assets/css/app.bundle.css')
  ]


};

