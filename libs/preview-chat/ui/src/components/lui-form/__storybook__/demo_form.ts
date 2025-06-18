import { json_schema } from '@myshell-run/common-def';
import { z } from 'zod';
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
      errorMessage: {
        minLength: 'Description must be at least 1 character long',
        maxLength: 'Description cannot exceed 280 characters',
        required: 'Description is required',
      },
      // todo: placeholder 用 example？
    },
    title: {
      title: 'Title',
      type: 'array',
      maxItems: 1,
      errorMessage: {
        required: 'Title image is required',
        maxItems: 'Only one title image is allowed',
      },
      items: {
        type: 'object',
        properties: {
          file: {
            type: 'object',
            properties: {
              uploadURL: {
                type: 'string',
                errorMessage: {
                  required: 'Upload URL is required',
                },
              },
              name: {
                type: 'string',
                errorMessage: {
                  required: 'File name is required',
                },
              },
            },
            required: ['uploadURL', 'name'],
            errorMessage: {
              required: 'File information is required',
            },
          },
        },
        required: ['file'],
        errorMessage: {
          required: 'File object is required',
        },
      },
    },
    style: {
      type: 'object',
      title: 'Style',
      properties: {
        name: {
          type: 'string',
          errorMessage: {
            required: 'Style name is required',
          },
        },
        title: {
          type: 'string',
          errorMessage: {
            required: 'Style title is required',
          },
        },
        url: {
          type: 'string',
          errorMessage: {
            required: 'Style URL is required',
          },
        },
      },
      required: ['name', 'title', 'url'],
      errorMessage: {
        required: 'Style configuration is required',
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
  required: ['description', 'title', 'style'],
  errorMessage: {
    required: 'Please fill in all required fields',
  },
};
