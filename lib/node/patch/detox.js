const ws = require('./../ws');
const ready = require('./../ready');
const timing = require('./../timing');

// TODO: Salakar: all of this will go in first release
// TODO: Salakar: jet global will provide it's own methods that internally call these

let detox;
try {
  // eslint-disable-next-line global-require
  detox = require('detox');
} catch (e) {
  // ignore
}

if (detox) {
  /* ---------------------
   *   DEVICE OVERRIDES
   * --------------------- */
  // TODO: Salakar: all of this will go in first release
  // TODO: Salakar: jet global will provide it's own methods that internally call these
  let device;
  Object.defineProperty(global, 'device', {
    get() {
      return device;
    },
    set(originalDevice) {
      // device.reloadReactNative({ ... })
      // todo detoxOriginalReloadReactNative currently broken it seems
      // const detoxOriginalReloadReactNative = originalDevice.reloadReactNative.bind(originalDevice);
      if (!originalDevice) {
        return undefined;
      }
      originalDevice.reloadReactNative = async () => {
        ready.reset();
        global.jet.reload();
        return ready.wait();
      };
      // TODO: Salakar: all of this will go in first release
      // TODO: Salakar: jet global will provide it's own methods that internally call these

      // device.launchApp({ ... })
      const detoxOriginalLaunchApp = originalDevice.launchApp.bind(originalDevice);
      originalDevice.launchApp = async options => {
        if (options && options.newInstance) {
          ready.reset();
        }
        const result = detoxOriginalLaunchApp(options);
        await ready.wait();
        return result;
      };

      device = originalDevice;
      return originalDevice;
    },
  });
  // TODO: Salakar: all of this will go in first release
  // TODO: Salakar: jet global will provide it's own methods that internally call these

  /* -------------------
   *   DETOX OVERRIDES
   * ------------------- */

  // TODO: Salakar: all of this will go in first release
  // TODO: Salakar: jet global will provide it's own methods that internally call these

  // detox.cleanup()
  const detoxOriginalCleanup = detox.cleanup.bind(detox);
  detox.cleanup = async (...args) => {
    timing.stop();
    // detox doesn't automatically terminate ios apps after testing
    // but does on android - added to keep consistency
    if (device.getPlatform() === 'ios') {
      await device.terminateApp();
    }
    ws.stop();
    await detoxOriginalCleanup(...args);
  };
}

module.exports = detox;
