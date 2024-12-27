/* https://github.com/rspack-contrib/rspack-examples/blob/main/rspack/react-storybook/.storybook/rspack.config.js */
const path = require('path');
module.exports = ({ config }) => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    ...config.resolve.alias,
    '@myshell-run/def': path.resolve(__dirname, '../../def/src/index.ts'),
  };
  return config;
};
