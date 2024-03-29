/* eslint-disable no-param-reassign,global-require */
let bundleFileName = null;
let sourceMapConsumer = null;

const ErrorStack = require('error-stack-parser');
const { SourceMapConsumer } = require('source-map');

/**
 * Convert an error frame into a source mapped string
 * @param parsed
 * @returns {string}
 */
function frameToStr(parsed) {
  const { name, line, column, source } = sourceMapConsumer.originalPositionFor({
    line: parsed.lineNumber,
    column: parsed.column,
  });
  return `    at ${name || parsed.functionName || '<anonymous>'} (${source ||
    parsed.fileName}:${line || parsed.lineNumber}:${column || parsed.columnNumber})`;
}

/**
 * Convert an errors stack frames to their original source mapped positions
 *
 * @param error
 * @return {*}
 */
function sourceMappedError(error) {
  if (!error || !error.stack) {
    return error;
  }
  const original = error.stack.split('\n');
  const parsed = ErrorStack.parse(error);

  const newStack = [original[0]];

  for (let i = 0; i < parsed.length; i++) {
    const { fileName } = parsed[i];
    if (fileName === bundleFileName) {
      newStack.push(frameToStr(parsed[i]));
    } else {
      newStack.push(original[i + 1]);
    }
  }

  error.stack = newStack.join('\n');
  return error;
}

module.exports = {
  sourceMappedError,
  /**
   * Build a source map consumer from source map bundle contents
   * @param str
   * @param fileName
   * @returns {Promise<void>}
   */
  async buildSourceMap(str, fileName) {
    bundleFileName = fileName;
    sourceMapConsumer = await new SourceMapConsumer(str);
  },
};
