/* eslint-disable */
export default {
  displayName: 'agent-ui',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.m?js$': '@swc/jest',
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            // 这两个都可以不需要，因为还没有真正测试 class 只是为了 parse 通过
            legacyDecorator: true,
            decoratorMetadata: true,
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/agent/ui',
  transformIgnorePatterns: [
    '../../../node_modules/(?!(@virtuoso.dev/message-list)/)',
  ],
};
