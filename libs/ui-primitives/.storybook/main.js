const path = require('path');

const cssCfg = {
  test: /\.css$/,
  include: path.resolve(__dirname, '../src'),
  use: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          config: path.resolve(
            __dirname,
            '../../tailwind-cfg/postcss.config.js',
          ),
        },
      },
    },
  ],
};

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
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
      '@nrwl/react/plugins/storybook',
      '@storybook/addon-designs',
    ],
    // https://storybook.js.org/docs/api/main-config-typescript#skipbabel
    // typescript: {
    //   check: false,
    //   reactDocgen: false,
    // },
    webpackFinal: async (config, { configType }) => {
      // Make whatever fine-grained changes you need that should apply to all storybook configs
      // Return the altered config
      config.module.rules.forEach((rule) => {
        if (rule.test && rule.test.toString) {
          if (
            rule.test.toString() ===
            '/\\.css$|\\.scss$|\\.sass$|\\.less$|\\.styl$/'
          ) {
            rule.oneOf.unshift(cssCfg);
            console.log('[custom] tailwindcss config added');
          }
          return (
            rule.test.toString() ===
            '/\\.css$|\\.scss$|\\.sass$|\\.less$|\\.styl$/'
          );
        }
        return false;
      });

      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      });

      return config;
    },
  };
}

module.exports = makeConfig(false);

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
