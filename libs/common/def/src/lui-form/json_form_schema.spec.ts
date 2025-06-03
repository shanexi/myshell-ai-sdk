import { json_form_schema } from './json_form_schema';

describe('string variant', () => {
  it('default', () => {
    json_form_schema.parse({
      variant: 'string_default',
      type: 'string',
      title: 'Selfie',
    });
  });

  it('default', () => {
    const a = json_form_schema.parse({
      variant: 'string_selector',
      type: 'string',
      title: 'Selfie',
      enum: ['a', 'b'],
    });
  });
});
