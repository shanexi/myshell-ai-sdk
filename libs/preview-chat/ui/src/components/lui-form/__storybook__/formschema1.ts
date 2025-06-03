export const formschema1 = {
  properties: {
    mytextarea_1: {
      name: 'mytextarea',
      type: 'string',
      description: null,
      default: null,
      // required: true,
      // validations: [
      //   {
      //     required: true,
      //     max_length: 2500,
      //     max_file_size: 10485760,
      //     max_number: 0.0,
      //     min_number: 0.0,
      //     max_items: null,
      //     min_items: null,
      //     error_message: 'Err!',
      //   },
      // ],
    },
    myimgupload_1: {
      name: 'myimgupload',
      type: 'image',
      description: null,
      default: null,
    },
    myimgchoice_1: {
      name: 'myimgchoice',
      type: 'image',
      description: null,
      default: null,
    },
    myselector_1: {
      name: 'myselector',
      type: 'string',
      description: null,
      default: 'Template 1',
      enum: ['Template 1', 'Template 2', 'Template 3'],
    },
    mynum_1: {
      name: 'mynum',
      type: 'number',
      description: '',
      default: '',
      // "required": true,
      // "validations": []
    },
    mybool_1: {
      name: 'mybool',
      type: 'boolean',
      description: '',
      default: '',
      // "required": true,
      // "validations": []
    },
  },
  required: [],
};
