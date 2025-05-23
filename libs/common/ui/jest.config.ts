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
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/common/ui',
  transformIgnorePatterns: ['../../../node_modules/(?!(html-tags)/)'],
};
