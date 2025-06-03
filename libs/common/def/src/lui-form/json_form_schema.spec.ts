import { json_form_schema, JsonFormSchema } from './json_form_schema';

describe('string variant', () => {
  it('default', () => {
    json_form_schema.parse({
      type: 'object',
      properties: {
        a: {
          variant: 'string_default',
          type: 'string',
          title: 'Selfie',
        },
      },
    });
  });

  it('string selector', () => {
    json_form_schema.parse({
      type: 'object',
      properties: {
        a: {
          variant: 'string_selector',
          type: 'string',
          title: 'Selfie',
          enum: ['a', 'b'],
        },
      },
    });
  });

  // https://www.figma.com/design/QCuwDQJUCZ7dfLbsmlSCZj/Basic-Page?node-id=3064-100577&m=dev
  it('full demo', () => {
    const demo = json_form_schema.parse({
      type: 'object',
      properties: {
        selfie: {
          variant: 'object_image_upload',
          type: 'object',
          title: 'Selfie',
          properties: {
            url: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
          },
          examples: [
            {
              url: 'a',
              title: '单人正脸',
            },
          ],
        },
        team_member: {
          variant: 'string_selector',
          type: 'string',
          title: 'Team member',
          enum: ['MyShell'],
        },
        description: {
          variant: 'string_textarea',
          type: 'string',
          title: 'Description',
          // todo: placeholder 用 example？
        },
        title: {
          variant: 'object_image_upload',
          type: 'object',
          title: 'Title',
          description: 'This is a simple description.',
          properties: {
            title: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
        },
        style: {
          variant: 'object_image_choice',
          type: 'object',
          title: 'Style',
          properties: {
            name: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
          examples: [
            {
              name: 'a',
              title: 'A',
              url: 'http://a',
            },
          ],
        },
      },
    } as JsonFormSchema);
  });
});
