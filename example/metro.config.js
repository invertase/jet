const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {resolve} = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
// Example of resolving your module in the parent directory:
// const yourReactNativeModuleName = 'jet';
// const yourReactNativeModule = resolve(__dirname, '..');
// const config = {
//   projectRoot: __dirname,
//   watchFolders: [resolve(__dirname, '.'), yourReactNativeModule],
//   resolver: {
//     extraNodeModules: {
//       [yourReactNativeModuleName]: yourReactNativeModule,
//     },
//   },
// };
const config = {
  transformer: {
    unstable_allowRequireContext: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
