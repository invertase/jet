/* eslint-disable no-param-reassign,global-require,no-multi-assign */

module.exports = {
  /** ----------- /
   *     JET
   * ------------*/
  require: require('./require'),

  getContext() {
    // TODO - INTERNALS.context ?
  },

  /** ----------- /
   *    DETOX
   * ------------*/

  async init() {
    // TODO - start background downloading bundle + sourceMap
    // TODO - ws.start()
    // TODO - ready.reset()
    // TODO - detox init()
    // TODO - ready.wait()
  },

  async cleanup() {
    // TODO - timing stop
    // TODO - terminate app if iOS
    // TODO - ws stop
    // TODO - detox cleanup
    // TODO - coverage??
  },

  /** ----------- /
   * DETOX DEVICE
   * ------------*/

  device: {
    getPlatform() {
      // TODO - detox.device.getPlatform
    },

    launchApp() {
      // TODO - ready.reset()
      // TODO - detox.device.launchApp
      // TODO - ready.wait()
    },

    reloadReactNative() {
      // TODO detox.device.reloadReactNative
    },
  },
};

// run patches
require('./patch/detox');
require('./patch/mocha');
require('./patch/node-globals');

// start the debugger ws
require('./ws').start();
