import { object_variant } from './object_variant';

describe('string variant', () => {
  it('default', () => {
    object_variant.parse({
      variant: 'object_default',
      type: 'object',
      title: 'Selfie',
    });
  });

  it('image upload', () => {
    object_variant.parse({
      variant: 'object_image_upload',
      type: 'object',
      title: 'Selfie',
      properties: {
        url: 'a',
        title: 'b',
      },
      examples: [
        {
          url: 'a',
          title: 'b',
        },
      ],
    });
  });

  it('image choices', () => {
    object_variant.parse({
      variant: 'object_image_choice',
      type: 'object',
      title: 'Selfie',
      properties: {
        url: 'a',
        title: 'B',
        name: 'b',
      },
      examples: [
        {
          url: 'a',
          title: 'B',
          name: 'b',
        },
      ],
    });
  });
});
