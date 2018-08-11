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
  isObject(item) {
    return item
      ? typeof item === 'object' && !Array.isArray(item) && item !== null
      : false;
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

    const { require: contextRequire } = jet.context;

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
};
