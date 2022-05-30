// .storybook/main.js with ckeditor5 plugin support
const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  framework: '@storybook/react',
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/preset-scss",
    "@storybook/addon-jest",
    "storybook-addon-performance/register",
    "@storybook/addon-controls",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.jsx?$/], //This is default
          include: [path.resolve(__dirname, '../src/stories')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
          injectStoryParameters: false,
        },
      },
    },
  ],
  features: {
    postcss: false,
  },
  core: {
    builder: 'webpack5'
  }
}

//function to check if the rule is css
function isCssRule( rule ) {
  return rule.test.toString().indexOf( 'css' ) > -1;
}

//function to check if the rule is svg
function isSvgRule( rule ) {
  return rule.test.toString().indexOf( 'svg' ) > -1;
}