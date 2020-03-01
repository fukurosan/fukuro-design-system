const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")
const babelConfigWww = require("./babel.config.www")

module.exports = {
  mode: "development",
  entry: "./src/Components/index.www.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "temp")
  },
  devtool: "source-map",
  devServer: {
    port: 8080,
    open: true
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        context: "node_modules/@webcomponents/webcomponentsjs",
        from: "**/*.js",
        to: "polyfills/webcomponents"
      },
      {
        context: "node_modules/@ungap/custom-elements-builtin",
        from: "min.js",
        to: "polyfills/builtins/min.js"
      }
    ])
  ]
}