#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const MERGED_DIR = 'coverage/merged';

console.log('\x1b[33m%s\x1b[0m', 'empty merge dir...');
fs.emptyDirSync(path.join(__dirname, `../${MERGED_DIR}`));
console.log('\x1b[32m%s\x1b[0m', 'done');

console.log('\x1b[33m%s\x1b[0m', 'merge...');
execSync(
  [
    `./node_modules/.bin/istanbul-merge --out ${MERGED_DIR}/coverage.json`,
    './coverage/apps/myshell-fun/coverage-final.json',
    './coverage/libs/chat/coverage-final.json',
    './coverage/libs/def/coverage-final.json',
  ].join(' '),
  {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  }
);
console.log('\x1b[32m%s\x1b[0m', 'done');

console.log('\x1b[33m%s\x1b[0m', 'html...');
execSync(
  `./node_modules/.bin/istanbul report --include ${MERGED_DIR}/coverage.json --dir ${MERGED_DIR} html`,
  {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  }
);
console.log('\x1b[32m%s\x1b[0m', 'done');
