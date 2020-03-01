const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const { HashedModuleIdsPlugin } = require("webpack")
const path = require("path")
const babelConfigEsNext = require("./babel.config.esnext")

module.exports = {
  mode: "production",
  entry: {
    bundle: "./src/Components/index.esnext.js",
    accordion: "./src/Components/Vanilla Components/fukuro-accordion/accordion",
    card: "./src/Components/Vanilla Components/fukuro-card/card",
    dropdown: "./src/Components/Vanilla Components/fukuro-dropdown/dropdown",
    jumbotron: "./src/Components/Vanilla Components/fukuro-jumbotron/jumbotron",
    cookiebanner: "./src/Components/Lit Components/fukuro-cookie-banner/fukuro-cookie-banner",
    tooltip: "./src/Components/Lit Components/fukuro-tooltip/fukuro-tooltip",
    button: "./src/Components/Extended Native Components/fukuro-is-button/isButton",
    explodingul: "./src/Components/Extended Native Components/fukuro-is-ul/isUl",
    groupnestedparent: "./src/Components/Composition Pattern Components/fukuro-list-group-datafor/list-group",
    groupnestedchild: "./src/Components/Composition Pattern Components/fukuro-list-group-nested/list-group/list-group",
    groupnesteddatafor: "./src/Components/Composition Pattern Components/fukuro-list-group-nested/list-group-item/list-group-item",
  },
  output: {
    filename: "fukurowc.[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist/esnext")
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        loader: "babel-loader",
        options: {
          ...babelConfigEsNext
        },
        exclude: /node_modules/,
      },
      {
        test: /node_modules(?:\/|\\)(lit-element|lit-html)/,
        loader: "babel-loader",
        options: {
          ...babelConfigEsNext
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
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.dist.html",
      excludeChunks: ["bundle"]
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
}