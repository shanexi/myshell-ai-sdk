#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[33m%s\x1b[0m', 'test storybook...');

function run(name, port) {
  console.time(`test-storybook ${name}`);
  execSync(
    [
      `./node_modules/.bin/concurrently -k -s first -n "${name} serve,${name} test"`,
      '-c "magenta,blue"',
      `"./node_modules/.bin/nx run ${name}:static-storybook -- --port=${port}"`,
      `"./node_modules/.bin/wait-on tcp:${port} && ./node_modules/.bin/nx run ${name}:test-storybook --url http://localhost:${port}"`,
    ].join(' '),
    {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    },
  );
  console.timeEnd(`test-storybook ${name}`);
}

run('biz-ui', 4600);
run('biz-message-item-plugins', 4610);
run('agent-ui', 4500);
run('agent-message-item-plugins', 4510);
run('agent-chat-input-plugis', 4520);

console.log('\x1b[32m%s\x1b[0m', 'done');
