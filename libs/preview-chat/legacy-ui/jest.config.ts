/* eslint-disable */
export default {
  displayName: 'preview-chat-legacy-ui',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/preview-chat/legacy-ui',
  transformIgnorePatterns: [
    '../../../node_modules/(?!(@virtuoso.dev/message-list)/)',
  ],
};
