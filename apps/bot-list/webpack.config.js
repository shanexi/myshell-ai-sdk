const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  // config.externals = {
  //   ...config.externals,
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   'react/jsx-runtime': 'jsxRuntime',
  // };
  return config;
});
