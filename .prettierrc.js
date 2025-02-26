module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.spec.ts',
      options: {
        semi: true,
      },
    },
    {
      files: '*.tsx',
      options: {
        plugins: ['prettier-plugin-tailwindcss'],
        tailwindStylesheet: './apps/bot-list/src/styles.css',
      },
    },
  ],
};
