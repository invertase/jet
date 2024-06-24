#!/usr/bin/env node
if (process.argv.includes('--coverage') && !process.env.NYC_CONFIG) {
  process.argv.unshift(require.resolve('./node_modules/.bin/nyc'));
  require('./node_modules/.bin/nyc');
} else {
  require('./lib/commonjs/cli.js');
}
