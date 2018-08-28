var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production';

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'public', 'index.html'),
  filename: "index.html",
  favicon: path.resolve(__dirname, 'public', 'favicon.ico')
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[hash].css',
  // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const uglifyJsPlugin = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  uglifyOptions: {
    compress: false,
    ecma: 6,
    mangle: true
  },
  sourceMap: true
});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  context: this.rootContext || this.context,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: (this.mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|otf|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: (this.mode === 'production') ? (process.env.PORT || 8080) : 8081,
  },
  plugins: [htmlWebpackPlugin, miniCssExtractPlugin],
  optimization: {
    minimizer: [uglifyJsPlugin],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    namedModules: (this.mode === 'development') ? true : false,
    namedChunks: (this.mode === 'development') ? true : false,
  }
};
