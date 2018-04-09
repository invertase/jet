import ReactNative from 'react-native';
import JSTimers from 'react-native/Libraries/Core/Timers/JSTimers';

const { NativeModules } = ReactNative;
const { RNBridge, Timing } = NativeModules;

let hasInitialized = false;
const bridgeNode = global.__bridgeNode;
const INTERNAL_KEYS = ['context', 'rn', 'reload'];

if (!bridgeNode) {
  RNBridge.debug(true);
} else {
  bridgeNode._replaceNativeTimers(Timing, JSTimers);

  bridgeNode.setBridgeProperty('rn', ReactNative);
  bridgeNode.setBridgeProperty('reload', RNBridge.reload);
}

export default {
  /**
   * Expose a property in node on the global.bridge object
   * @param key
   * @param value
   */
  setBridgeProperty(key, value) {
    if (!bridgeNode) return;
    if (INTERNAL_KEYS.includes(key)) return;
    bridgeNode.setBridgeProperty(key, value);
    // notify ready on first setBridgeProp
    if (!hasInitialized) {
      bridgeNode._ready();
      hasInitialized = true;
    }
  },
};
