const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const merge = require("webpack-merge")
const common = require("./webpack.config.common")
const path = require("path")
const babelConfigWww = require("./babel.config.www")

module.exports = merge(common, {
  mode: "production",
  entry: {
    bundle: "./src/Components/index.www.js"
  },
  output: {
    filename: "fukurowc-[name].js",
    path: path.resolve(__dirname, "../dist/www")
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        loader: "babel-loader",
        options: {
          ...babelConfigWww
        },
        exclude: /node_modules/,
      },
      {
        test: /node_modules(?:\/|\\)(lit-element|lit-html)/,
        loader: "babel-loader",
        options: {
          ...babelConfigWww
        }
      },
      {
        test: /\.scss$/i,
        use: [
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.dist.html"
    }),
    //new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      chunks: "all",
      name: "vendor"
    }
  }
})