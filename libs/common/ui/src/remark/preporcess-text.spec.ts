import { preprocessText } from './proprocess-text';

it('test', () => {
  const a = `:\\:hello`;
  const b = preprocessText([], a);
  console.log(b);
  expect(b).toEqual(a);
});

it('test2', () => {
  const a = `::hello`;
  const b = preprocessText([], a);
  expect(b).toEqual(`:\\:hello`);
});

it('test3', () => {
  const a = `/cli.js:327:2020`;
  const b = preprocessText([], a);
  expect(b).toEqual(`/cli.js\\:327\\:2020`);
});

it('test4', () => {
  const a = `:x-loading`;
  const b = preprocessText(['x-loading'], a);
  expect(b).toEqual(`:x-loading`);
});
