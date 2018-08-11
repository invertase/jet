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

/**
 * Patch Node.js global targets to return their RN equivalents
 * This is needed otherwise instanceof checks will fail
 * in both Node.js code and RN code.
 *
 * E.g. Node's Array class is !instanceof RN's Array class.
 *
 * This only patches if called from inside a test context.
 */
const {
  isContextAvailable,
  isInsideMochaTestRunnerOrHookFn,
} = require('./../utils');

// keep a reference to the original objects
const ORIGINALS = {};

// the global targets that should be patched to return
// RN's context version of the target
const TARGETS = ['Uint8Array', 'Array', 'Object'];

for (let i = 0, len = TARGETS.length; i < len; i++) {
  const target = TARGETS[i];
  ORIGINALS[target] = global[target];
  Object.defineProperty(global, target, {
    get() {
      // if rn's context is available and only if we're inside a
      // test do we return the RN version of the target, otherwise
      // the original is returned so that these patches aren't too drastic
      if (isContextAvailable() && isInsideMochaTestRunnerOrHookFn()) {
        return jet.context.window[target];
      }
      return ORIGINALS[target];
    },
  });
}

module.exports = {};
