/* eslint-disable global-require */
/*
  Copyright (c) 2018 Mike Diarmid (Salakar) <mike.diarmid@gmail.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this library except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// react native bundle require map cache
let contextRequireMapCache;

module.exports = {
  /**
   * Is object except for array and null
   * @param target
   * @return {boolean}
   */
  isObject(target) {
    return target
      ? typeof target === 'object' && !Array.isArray(target) && target !== null
      : false;
  },

  /**
   * Is the React Native context available,
   * only available when connected to debugger.
   * @return {{init, require}|*}
   */
  isContextAvailable() {
    return global.jet && global.jet.context;
  },

  /**
   * Whether the current call stack originates from inside a
   * Mocha test runner fn or mocha hook fn, e.g it(fn) or beforeEach(fn)
   *
   * @return {*|boolean}
   */
  isInsideMochaTestRunnerOrHookFn() {
    const { stack } = new Error();
    return (
      stack.includes('Context.it') ||
      stack.includes('Context.before') ||
      stack.includes('Context.beforeEach') ||
      stack.includes('Context.after') ||
      stack.includes('Context.afterEach')
    );
  },

  /**
   * Get the `require` function from inside the React Native bundle context
   * @return {{type: string, properties: {ClassDeclaration: {type: string}, MethodDefinition: {type: string}, FunctionDeclaration: {type: string}, ArrowFunctionExpression: {type: string}, FunctionExpression: {type: string}}, additionalProperties: boolean}|properties.require|{type, properties, additionalProperties}|module.require|number}
   */
  getContextRequire() {
    return jet.context.require;
  },

  /**
   *
   * @param noCache
   * @return {{}}
   */
  getContextRequireMap(noCache = false) {
    if (contextRequireMapCache && !noCache) {
      return contextRequireMapCache;
    }

    const contextRequire = module.exports.getContextRequire();

    // map names to id's for reverse lookup
    // and caches for re-use
    contextRequireMapCache = {};
    // noinspection JSUnresolvedFunction
    const modules = Object.entries(contextRequire.getModules());
    for (let i = 0; i < modules.length; i++) {
      const [contextModuleId, contextModule] = modules[i];
      // verboseName = full file name + path
      // noinspection JSUnresolvedVariable
      contextRequireMapCache[contextModule.verboseName] = parseInt(
        contextModuleId,
        10
      );
    }

    return contextRequireMapCache;
  },

  /**
   * Converts a Node.js Object to a React Native context Object
   *
   * @param target
   * @return {*}
   * @constructor
   */
  Object(target) {
    if (!global.jet.context) return target;
    const { Object } = jet.context.window;
    // eslint-disable-next-line
    return Object.assign(new Object(), target);
  },

  /**
   * Converts a Node.js Array to a React Native context Object
   *
   * @param target
   * @return {*}
   * @constructor
   */
  Array(target) {
    if (!global.jet.context) return target;
    const { Array } = jet.context.window;
    // eslint-disable-next-line
    return new Array(...target);
  },

  /**
   * Converts the target to it's React Native context equivalent
   * e.g an Array (created in Node.js
   * @param target
   * @return {*}
   */
  toReactNativeContextEquivalent(target) {
    if (isObject(target)) return module.exports.Object(target);
    if (Array.isArray(target)) return module.exports.Array(target);
    return target;
  },

  /**
   * Make sinon and should the default globally available
   * test assertion/spies/stubs/mocks utilities.
   *
   * Currently for these utilities to work
   * they need to be required in both environments, the pairing
   * React Native import for jet also bootstraps these
   * (not globally though as not required) so that they function
   * on objects created inside the vm context of RN.
   */
  makeShouldAndSinonGlobal() {
    global.sinon = require('sinon');
    require('should-sinon');
    global.should = require('should');
  },
};
