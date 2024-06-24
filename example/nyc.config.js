module.exports = {
  'check-coverage': false,
  lines: 95,
  statements: 95,
  functions: 95,
  branches: 95,
  include: ['**/*.js', '**/*.ts', '**/*.tsx'],
  exclude: [
    // Add excludes here.
  ],
  // cwd: '..',
  cwd: '.',
  sourceMap: false,
  instrument: false,
  reporter: ['lcov', 'html', 'text-summary'],
};
