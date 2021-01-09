const path = require('path');
const { merge } = require('webpack-merge');
const devConf = require('./webpack.dev');
const prodConf = require('./webpack.prod');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConf = {
  entry: path.resolve(__dirname, './src/modal/index.js'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd', // 支持库引入的方式
    libraryExport: 'default',
  },
  devtool: 'eval-cheap-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.html$/,
            use: {
              loader: 'html-loader',
              options: {
                minimize: true,
                esModule: false,
              },
            },
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      corejs: 3,
                      helpers: true,
                      regenerator: true,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};

const devConfig = merge(baseConf, devConf);
const prodConfig = merge(baseConf, prodConf);

module.exports =
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
