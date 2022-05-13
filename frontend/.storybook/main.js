const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-addon-next-router",
  ],
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_STRAPI_URL: "",
  }),
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  // https://github.com/storybookjs/storybook/issues/10231
  features: {
    emotionAlias: false,
  },
  typescript: { reactDocgen: false },
};
