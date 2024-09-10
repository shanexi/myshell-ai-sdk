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
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
    './libs/chat/src/**/*.tsx': {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    './libs/chat/src/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
