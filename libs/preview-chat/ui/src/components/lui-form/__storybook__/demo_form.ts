import { json_schema } from '@myshell-run/common-def';
import { z } from 'zod';

export const demo_uischema = {
  description: {
    variant: 'string_textarea',
  },
  title: {
    variant: 'object_image_upload',
  },
  style: {
    variant: 'object_image_choice',
  },
};
export const demo_jsonschema = {
  type: 'object',
  title: 'Image Configuration',
  properties: {
    // selfie: {
    //   variant: 'object_image_upload',
    //   type: 'object',
    //   title: 'Selfie',
    //   properties: {
    //     url: {
    //       type: 'string',
    //     },
    //     title: {
    //       type: 'string',
    //     },
    //   },
    //   examples: [
    //     {
    //       url: 'a',
    //       title: '单人正脸',
    //     },
    //   ],
    // },
    // team_member: {
    //   variant: 'string_selector',
    //   type: 'string',
    //   title: 'Team member',
    //   enum: ['MyShell'],
    // },
    description: {
      type: 'string',
      title: 'Description',
      // todo: placeholder 用 example？
    },
    title: {
      title: 'Title',
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        properties: {
          file: {
            type: 'object',
            properties: {
              uploadURL: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    style: {
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
} satisfies z.infer<typeof json_schema>;
