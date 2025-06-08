/* eslint-disable */
export default {
  displayName: 'common-ui',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/common/ui',
  transformIgnorePatterns: ['../../../node_modules/(?!(html-tags)/)'],
};
