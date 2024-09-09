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
    webpackFinal: async (config) => {
      // https://github.com/storybookjs/storybook/issues/23295
      config.resolve.alias = {
        '@/styles/md-viewer.scss': false,
        '@/common/assets/audio-playing.json': false,
        '@/common/assets/images/workshop/BotDetailBg.png': false,
      };
      config.resolve.fallback = {
        ...config.resolve?.fallback,
        zlib: false,
      };
      return config;
    },
  };
}

module.exports = makeConfig(false);

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
