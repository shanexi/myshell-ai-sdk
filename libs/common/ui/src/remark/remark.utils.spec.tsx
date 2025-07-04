import { parseDirective, stringifyDirective } from './remark.utils';
it('parse directive', () => {
  const a = `::x-think{#1751358388436789 text="🔧 Calling tool: **requirements_create**&#10;"}`;
  const b = parseDirective(a);
  expect(b).toMatchInlineSnapshot(`
    [
      {
        "attributes": {
          "id": "1751358388436789",
          "text": "🔧 Calling tool: **requirements_create**
    ",
        },
        "name": "x-think",
      },
    ]
  `);
});

it('stringify directive', () => {
  const a = {
    attributes: {
      id: '1751358388436789',
      text: '🔧 Calling tool: **requirements_create**',
    },
    name: 'x-think',
  };
  const b = stringifyDirective(a);
  expect(b).toMatchInlineSnapshot(
    `"::x-think{#1751358388436789 text="🔧 Calling tool: **requirements_create**"}"`,
  );
});
