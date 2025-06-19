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
  team_member: {
    variant: 'string_select',
  },
  age: {
    variant: 'number_range',
  },
};

export const demo_jsonschema: JSONSchemaType<{
  age: number;
  description: string;
  team_member: string;
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
    age: {
      title: 'Age',
      type: 'number',
      multipleOf: 1,
      minimum: 16,
      maximum: 70,
    },
    team_member: {
      type: 'string',
      title: 'Team member',
      enum: ['Backend', 'Frontend', 'Algorithm'],
      description: 'Select a team',
    },
    description: {
      type: 'string',
      title: 'Description',
      maxLength: 280,
      minLength: 1,
      description: 'This is a description',
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
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
          name: '1',
          title: '1',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
          name: '2',
          title: '2',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
          name: '3',
          title: '3',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
          title: '4',
          name: '4',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
          title: '5',
          name: '5',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
          title: '6',
          name: '6',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
          title: '7',
          name: '7',
        },
        {
          url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
          title: '8',
          name: '8',
        },
      ],
    },
  },
  required: ['description', 'age', 'team_member'],
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
    //   variant: 'string_select',
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
