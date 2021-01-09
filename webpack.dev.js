const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'lib'),
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    host: '0.0.0.0',
  },
};
