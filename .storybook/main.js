module.exports = {
  stories: ["../src/Stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-knobs/register",
    "@storybook/addon-viewport/register",
    "@storybook/addon-backgrounds/register",
    "@whitespace/storybook-addon-html/register"
  ],
  webpackFinal: (config) => {
    return {
      ...config, module: {
        ...config.module,
        rules: [
          {
            test: /\.(js|ts)?$/,
            use: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /node_modules(?:\/|\\)(lit-element|lit-html)/,
            loader: "babel-loader",
          },
          {
            test: /\.scss$/i,
            use: [
              "raw-loader",
              "sass-loader"
            ],
          },
          {
            test: /\.html$/i,
            use: [
              "raw-loader"
            ],
          }
        ],
      }
    }
  }
}