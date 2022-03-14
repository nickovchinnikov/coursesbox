module.exports = {
  "stories": [
    '../pages/**/*.stories.mdx',
    '../pages/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}