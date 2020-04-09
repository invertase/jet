import ReactNative from 'react-native';

const { NativeModules } = ReactNative;
const { Jet } = NativeModules;

require('sinon');
require('should-sinon');
require('should');

let hasInitialized = false;
const jetNode = global.__jetNode;
const INTERNAL_KEYS = ['context', 'rn', 'reload'];

if (!jetNode) {
  Jet.debug(true);
} else {
  jetNode.exposeContextProperty('rn', ReactNative);
  jetNode.exposeContextProperty('reload', Jet.reload);
}

export default {
  /**
   * Expose a property in node on the global.jet object
   * @param key
   * @param value
   */
  exposeContextProperty(key, value) {
    if (!jetNode) return;
    if (INTERNAL_KEYS.includes(key)) return;
    jetNode.exposeContextProperty(key, value);
    // notify ready on first setBridgeProp
    if (!hasInitialized) {
      jetNode._ready();
      hasInitialized = true;
    }
  },
};
