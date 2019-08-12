// webpack config file

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
 const isProd = process.env.NODE_ENV === 'production'
 module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  entry: {
    index: './main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'vueConciseSlider',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
}