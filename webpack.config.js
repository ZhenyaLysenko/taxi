var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

module.exports = {
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
            loader: (devMode) ? "style-loader" : MiniCssExtractPlugin.loader
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
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: process.env.PORT || 8080
  },
  plugins: [htmlWebpackPlugin, miniCssExtractPlugin],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
