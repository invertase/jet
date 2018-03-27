import ReactNative from 'react-native';

const { NativeModules } = ReactNative;
const { RNBridge } = NativeModules;

let hasInitialized = false;
const bridgeNode = global.__bridgeNode;
const INTERNAL_KEYS = ['context', 'rn', 'reload'];

if (!bridgeNode) {
  bridgeNode.debug(true);
} else {
  bridgeNode.setBridgeProperty('reload', RNBridge.reload);
  bridgeNode.setBridgeProperty('rn', ReactNative);
  // keep alive
  // I don't do anything...
  // BUT i am needed - otherwise RN's batched bridge starts to hang ... ???
  setInterval(() => {}, 60);
  global.__driftCheck = delay => {
    setTimeout(bridgeNode._callbackDriftCheck, delay);
  };
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
    if (bridgeNode) {
      bridgeNode.setBridgeProperty(key, value);

      // notify ready on first setBridgeProp
      if (!hasInitialized) {
        bridgeNode._ready();
        hasInitialized = true;
      }
    }
  },
};
