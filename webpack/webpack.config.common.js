const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

//This is common config used to move files like polyfills and documentation
//This config should always be merged with the first build executed (in this case www)
module.exports = {
  plugins: [
    //Move polyfills and documentation
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        context: "node_modules/@webcomponents/webcomponentsjs",
        from: "**/*.js",
        to: "../polyfills/webcomponents"
      },
      {
        context: "node_modules/@ungap/custom-elements-builtin",
        from: "min.js",
        to: "../polyfills/builtins/min.js"
      },
      {
        context: "./src",
        from: "custom-elements.json",
        to: "../documentation"
      }
    ])
  ]
}