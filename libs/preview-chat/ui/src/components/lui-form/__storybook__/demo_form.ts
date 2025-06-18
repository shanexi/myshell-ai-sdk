import { JSONSchemaType } from 'ajv';

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
export const demo_jsonschema: JSONSchemaType<{
  description: string;
  title: Array<{
    file: {
      uploadURL: string;
      name: string;
    };
  }>;
  style: {
    name: string;
    title: string;
    url: string;
  };
}> = {
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
      maxLength: 280,
      minLength: 1,
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
            required: ['uploadURL', 'name'],
          },
        },
        required: ['file'],
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
      required: ['name', 'title', 'url'],
      examples: [
        {
          name: 'a',
          title: 'A',
          url: 'http://a',
        },
      ],
    },
  },
  required: ['description', 'title', 'style'],
};

export const demo_jsonschema_custom_error_message: JSONSchemaType<{
  description: string;
  title: Array<{
    file: {
      uploadURL: string;
      name: string;
    };
  }>;
  style: {
    name: string;
    title: string;
    url: string;
  };
}> = {
  type: 'object',
  title: 'Image Configuration',
  // TODO 增加 additionalProperties
  // additionalProperties: false,
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
      maxLength: 280,
      minLength: 1,
      // todo: placeholder 用 example？
      errorMessage: {
        minLength: 'should not be empty',
      },
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
            required: ['uploadURL', 'name'],
          },
        },
        required: ['file'],
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
      required: ['name', 'title', 'url'],
      examples: [
        {
          name: 'a',
          title: 'A',
          url: 'http://a',
        },
      ],
      errorMessage: {
        required: {
          url: 'Must have url',
          title: 'Must have title',
        },
      },
    },
  },
  required: ['description', 'title', 'style'],
};
