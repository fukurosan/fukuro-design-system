const custom = require("../webpack/webpack.config.www.js");
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
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
}