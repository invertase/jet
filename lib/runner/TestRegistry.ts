/*
 * A registry of all tests indexed by path along with
 * the last result of each test run.
 */

import { Test, TestResult } from './Test';

// all tests were imported here

class TestRegistry {
  private _tests: { [path: string]: Test } = {};

  private _results: { [path: string]: TestResult } = {};

  // constructor() {
  // tests imported above were then registered here like:
  // this.registerTest(AccessibilityTest);
  // }

  registerTest(test: Test) {
    this._tests[test.getPath()] = test;
  }

  getAllTests(): { [path: string]: Test } {
    return this._tests;
  }

  getTest(path: string): Test {
    return this._tests[path];
  }

  getResult(path: string): TestResult {
    return this._results[path];
  }

  setResult(path: string, result: TestResult): void {
    this._results[path] = result;
  }

  formatPath(path: string): string {
    return path.replace(/\//gi, ' - ');
  }
}

export default new TestRegistry();
