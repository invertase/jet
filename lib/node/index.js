/* eslint-disable no-param-reassign,global-require,no-multi-assign */
const { getContextRequireMap, isObject } = require('./utils');

global.jet = module.exports = {
  /**
   * TODO docs
   */
  init() {
    return require('./ready').wait();
  },
  /**
   * TODO docs
   * @param {*} target
   * @param {*} unCached
   */
  require(target, unCached = false) {
    if (!jet.context) {
      throw new Error(
        'Context not available - jet.require must be used inside your individual tests, not in the global or module scope.'
      );
    }

    const contextRequireMap = getContextRequireMap(unCached);

    let moduleIdFound = contextRequireMap[target];

    if (!moduleIdFound) {
      moduleIdFound = contextRequireMap[`${target}.js`];
    }

    if (!moduleIdFound) {
      moduleIdFound = contextRequireMap[`${target}.jsx`];
    }

    if (!moduleIdFound) {
      moduleIdFound = contextRequireMap[`${target}.ts`];
    }

    // RN 56 - paths now include `relative to` indicators
    // TODO multiple targets + file extensions
    if (!moduleIdFound) {
      moduleIdFound = contextRequireMap[`../${target}.js`];
    }

    // todo any other extensions?
    if (!moduleIdFound) {
      throw new Error(`Module not found (${target}).`);
    }

    const exports = contextRequireMap(moduleIdFound);
    return Object.hasOwnProperty.call(exports, 'default')
      ? exports.default
      : exports;
  },

  Object(nodeObjectSrc) {
    if (!global.jet.context) return nodeObjectSrc;
    const { Object } = jet.context.window;
    // noinspection JSPrimitiveTypeWrapperUsage
    // eslint-disable-next-line
    return Object.assign(new Object(), nodeObjectSrc);
  },

  Array(nodeArraySrc) {
    if (!global.jet.context) return nodeArraySrc;
    const { Array } = jet.context.window;
    // eslint-disable-next-line
    return new Array(...nodeArraySrc);
  },

  contextify(src) {
    if (isObject(src)) return module.exports.Object(src);
    if (Array.isArray(src)) return module.exports.Array(src);
    return src;
  },
};

// run patches
require('./patch/detox');
require('./patch/mocha');
require('./patch/node-globals');

// start the debugger ws
require('./ws').start();
