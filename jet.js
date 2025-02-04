#!/usr/bin/env node
const fs = require('fs');

if (process.argv.includes('--coverage') && !process.env.NYC_CONFIG) {
  const nycPath = `${process.cwd()}/node_modules/.bin/nyc`;
  if (!fs.existsSync(nycPath)) {
    throw Error(
      `Jet: '--coverage' requested but cannot find 'nyc'. Did not run from app root? Looked in: '${nycPath}'`
    );
  }

  process.argv.unshift(require.resolve(nycPath));
  require(nycPath);
} else {
  require('./lib/commonjs/cli.js');
}
