import { string_variant } from './string_variant';

describe('string variant', () => {
  it('default', () => {
    string_variant.parse({
      variant: 'string_default',
      type: 'string',
      title: 'Selfie',
    });
  });

  it('default', () => {
    string_variant.parse({
      variant: 'string_selector',
      type: 'string',
      title: 'Selfie',
      enum: ['a', 'b'],
    });
  });
});
