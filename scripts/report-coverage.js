#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const argv = process.argv.slice(2);

console.log('\x1b[33m%s\x1b[0m', 'pnpm i...');
execSync('pnpm dlx pnpm@7.33.7 i --frozen-lockfile --ignore-scripts', {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});
console.log('\x1b[32m%s\x1b[0m', 'done');

console.log('\x1b[33m%s\x1b[0m', 'test all...');
console.time('test');
execSync('./node_modules/.bin/nx run-many --target test', {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});
console.timeEnd('test');
console.log('\x1b[32m%s\x1b[0m', 'done');

execSync(
  'node ./scripts/report-coverage-part2.js' +
    (argv.length === 0 ? '' : ' ' + argv.join(' ')),
  {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  }
);
