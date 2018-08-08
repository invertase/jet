/* eslint-disable guard-for-in,no-restricted-syntax */
global.jet.context = null;

const timing = require('./timing');
const consoleContext = require('./console');
const { createContext } = require('vm');

let customBridgeProps = [];

module.exports = {
  /**
   * Cleanup existing context  - just some quick iterations over common fb/rn/jet locations
   * garbage collection will do the rest. This is probably not needed...
   */
  async cleanup() {
    if (global.jet.context) {
      if (global.jet.beforeContextReset) {
        await global.jet.beforeContextReset();
      }

      for (const name in global.jet.context.__fbBatchedBridge) {
        global.jet.context.__fbBatchedBridge[name] = undefined;
        delete global.jet.context.__fbBatchedBridge[name];
      }

      for (const name in global.jet.context.__fbGenNativeModule) {
        global.jet.context.__fbGenNativeModule[name] = undefined;
        delete global.jet.context.__fbGenNativeModule[name];
      }

      for (const name in global.jet.context.__fbBatchedBridgeConfig) {
        global.jet.context.__fbBatchedBridgeConfig[name] = undefined;
        delete global.jet.context.__fbBatchedBridgeConfig[name];
      }

      for (const name in global.jet.context) {
        global.jet.context[name] = undefined;
        delete global.jet.context[name];
      }

      global.jet.context = undefined;

      // clear custom props and reset props track array
      for (let i = 0; i < customBridgeProps.length; i++) {
        global.jet[customBridgeProps[i]] = undefined;
        delete global.jet[customBridgeProps[i]];
      }

      customBridgeProps = [];
    }
  },

  /**
   * Create a new context for a RN app to attach to, we additionally provide __jetNode for
   * the counterpart RN jet code to attach to and communicate back
   */
  create() {
    global.jet.context = createContext({
      console: consoleContext(),
      __jetNode: {
        _ready() {
          setTimeout(() => process.emit('jet-attached'), 1);
        },

        _replaceNativeTimers(nativeTiming, jsTiming) {
          timing.start(nativeTiming, jsTiming);
        },

        setBridgeProperty(key, value) {
          customBridgeProps.push(key);
          global.jet[key] = value;
        },
      },
    });
  },
};
