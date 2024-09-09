/* eslint-disable */

export default {
  displayName: 'chat',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
    '^.+\\.mjs$': '@swc/jest',
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!.*\\.mjs$)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/chat',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './libs/chat/src/**/*.tsx': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
    './libs/chat/src/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
