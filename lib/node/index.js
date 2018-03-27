/* eslint-disable no-param-reassign,global-require */
global.bridge = {};

// run patches
require('./patch/detox');
require('./patch/mocha');

// start the debugger ws
require('./ws').start();
