const proc = require('node:child_process');

module.exports = {
  config: {
    // Global config overrides/defaults...
  },
  targets: {
    // Use any key name to specify a new 'target' (--target=<key>)
    // [key: string]: { ... }
    macos: {
      config: {
        // Per target config overrides...
        // These will override in order of:
        // ...cliFlags
        // ...globalConfig
        // ...targetConfig
      },
      /**
       * Use this to run builds, start the application etc.
       */
      async before(config) {
        proc.spawnSync('npx', ['react-native', 'run-macos']);
        return config;
      },
      /**
       * Use this for cleanup & teardown.
       */
      async after(config) {
        console.log('After');
      },
    },
  },
};
