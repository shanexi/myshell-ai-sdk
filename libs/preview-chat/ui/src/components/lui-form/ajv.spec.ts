import { json_schema } from '@myshell-run/common-def';
import { demo_jsonschema } from './__storybook__/demo_form';
import { validate } from './lui-form.utils';
import { z } from 'zod';

it('ajv', () => {
  const valid = validate(
    demo_jsonschema as unknown as z.infer<typeof json_schema>,
    {
      description: 'John Doe',
      title: [
        {
          file: {
            uploadURL: 'https://example.com/upload',
            name: 'example.png',
          },
        },
      ],
      style: {
        name: 'John Doe',
        title: 'example.png',
        url: 'https://example.com/upload',
      },
    },
  );
  expect(valid).toMatchInlineSnapshot(`
    {
      "errors": null,
      "success": true,
    }
  `);
});
