/* eslint-disable */
export default {
  displayName: 'preview-chat-ac',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/preview-chat/ac',
  transformIgnorePatterns: [
    '../../../node_modules/(?!(@virtuoso.dev/message-list)/)',
  ],
};
