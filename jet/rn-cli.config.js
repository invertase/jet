const { resolve } = require('path');

let metroBundler;
try {
  metroBundler = require('metro');
} catch (ex) {
  metroBundler = require('metro-bundler');
}

const blacklist = metroBundler.createBlacklist;

module.exports = {
  getProjectRoots() {
    return [__dirname, resolve(__dirname, '..')];
  },
  getProvidesModuleNodeModules() {
    return [
      'react-native',
      'react',
      // need to include all the packages used by
      // the parent library - in this case Jet
      'should',
      'should-sinon',
      'sinon',
    ];
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(`^${escape(resolve(__dirname, '..', 'node_modules'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests'))}\\/.*$`),
      new RegExp(
        `^${escape(resolve(__dirname, '..', 'tests', 'node_modules'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(
          resolve(__dirname, '..', 'jet', 'node_modules', 'nyc')
        )}\\/.*$`
      ),
    ]);
  },
};
