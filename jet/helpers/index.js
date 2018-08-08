/* eslint-disable global-require */
global.isObject = function isObject(item) {
  return item
    ? typeof item === 'object' && !Array.isArray(item) && item !== null
    : false;
};

// TODO move to jet -> e.g. `await jet.sleep(1000);`
global.sleep = duration =>
  new Promise(resolve => setTimeout(resolve, duration));

// TODO testing console log filtering possibilities, might
// TODO be a good feature for Jet?
// const originalLog = console.log;
// console.log = (...args) => {
//   if (
//     args &&
//     args[0] &&
//     typeof args[0] === 'string' &&
//     (args[0].toLowerCase().includes('deprecated') ||
//       args[0].toLowerCase().includes('restrictions in the native sdk'))
//   ) {
//     return undefined;
//   }
//
//   return originalLog(...args);
// };

/**
 * Old style deferred promise shim - for niceness
 *
 * @returns {{resolve: null, reject: null}}
 */
Promise.defer = function defer() {
  const deferred = {
    resolve: null,
    reject: null,
  };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};
