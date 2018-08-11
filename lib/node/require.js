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

const {
  getContextRequire,
  getContextRequireMap,
  isContextAvailable,
} = require('./utils');

// supported file extensions for jet.require()
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

/**
 *  Require a bundled find from inside a React Native bundles context.
 * @param target
 * @param unCached
 * @return {*}
 */
module.exports = function require(target, unCached = false) {
  if (!isContextAvailable()) {
    throw new Error(
      'Context not available - jet.require must be used inside your individual tests, not in the global or module scope.'
    );
  }

  let moduleId;
  const contextRequireMap = getContextRequireMap(unCached);

  for (let i = 0, len = EXTENSIONS.length; i < len; i++) {
    const fileExt = EXTENSIONS[i];
    moduleId = contextRequireMap[`${target}${fileExt}`];
    if (!moduleId) moduleId = contextRequireMap[`../${target}${fileExt}`];
    if (moduleId) break;
  }

  if (!moduleId) {
    throw new Error(`Module not found (${target}).`);
  }

  const exports = getContextRequire()(moduleId);

  // TODO should we just return exports rather than exports.default here?
  return Object.hasOwnProperty.call(exports, 'default')
    ? exports.default
    : exports;
};
