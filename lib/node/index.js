/* eslint-disable no-param-reassign,global-require,no-multi-assign */
let rnRequireMap;
// TODO move to utils
function isObject(item) {
  return item
    ? typeof item === 'object' && !Array.isArray(item) && item !== null
    : false;
}

global.bridge = module.exports = {
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
    if (!bridge.context) {
      throw new Error(
        'Context not available - bridge.require must be used inside your individual tests, not in the global or module scope.'
      );
    }
    const { require: rnRequire } = bridge.context;

    // map names to id's for reverse lookup
    if (!rnRequireMap || unCached) {
      rnRequireMap = {};
      const modules = Object.entries(rnRequire.getModules());
      for (let i = 0; i < modules.length; i++) {
        const [id, module] = modules[i];
        rnRequireMap[module.verboseName] = parseInt(id, 10);
      }
    }

    let moduleIdFound = rnRequireMap[target];

    if (!moduleIdFound) {
      moduleIdFound = rnRequireMap[`${target}.js`];
    }

    if (!moduleIdFound) {
      moduleIdFound = rnRequireMap[`${target}.jsx`];
    }

    if (!moduleIdFound) {
      moduleIdFound = rnRequireMap[`${target}.ts`];
    }

    // todo any other extensions?
    if (!moduleIdFound) {
      throw new Error(`Module not found (${target}).`);
    }

    const exports = rnRequire(moduleIdFound);
    return Object.hasOwnProperty.call(exports, 'default')
      ? exports.default
      : exports;
  },

  Object(nodeObjectSrc) {
    if (!global.bridge.context) return nodeObjectSrc;
    const { Object } = bridge.context.window;
    // eslint-disable-next-line
    return Object.assign(new Object(), nodeObjectSrc);
  },

  Array(nodeArraySrc) {
    if (!global.bridge.context) return nodeArraySrc;
    const { Array } = bridge.context.window;
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

// start the debugger ws
require('./ws').start();
