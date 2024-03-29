module.exports = {
  arrowParens: 'avoid',
  trailingComma: 'all',
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  tabWidth: 2,
  printWidth: 100,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 400,
      },
    },
  ],
};
