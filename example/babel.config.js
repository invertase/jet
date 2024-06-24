module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'istanbul',
      {
        cwd: '.',
        instrument: true,
        relativePath: true,
        include: ['**/*.js', '**/*.ts', '**/*.tsx'],
        useInlineSourceMaps: false,
      },
    ],
  ],
};
