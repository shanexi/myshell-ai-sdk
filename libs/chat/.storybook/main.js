function makeConfig(useRspack = true) {
  const framework = useRspack
    ? 'storybook-react-rspack'
    : '@storybook/react-webpack5';
  return {
    core: {
      disableTelemetry: true,
    },
    framework: {
      name: '@storybook/react-webpack5',
      options: {},
    },
    stories: [
      '../src/lib/**/*.mdx',
      '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-essentials', '@nrwl/react/plugins/storybook'],
    // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
    // typescript: {
    //   check: false,
    //   reactDocgen: false,
    // },
  };
}

module.exports = makeConfig(false);

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
