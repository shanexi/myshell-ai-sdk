const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'src/index.html'),
    path.join(__dirname, 'src/**/*.tsx'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
