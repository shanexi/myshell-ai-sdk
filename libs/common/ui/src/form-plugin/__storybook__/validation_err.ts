const yupErr = {
  value: {
    title: [{ file: { name: 'example.png' } }],
    style: { name: 'John Doe' },
  },
  errors: [
    'description is a required field',
    'style.title is a required field',
    'title[0].file.uploadURL is a required field',
    'style.url is a required field',
  ],
  inner: [
    {
      path: 'description',
      type: 'optionality',
      params: {
        path: 'description',
        spec: {
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          disableStackTrace: false,
          nullable: false,
          optional: false,
          coerce: true,
        },
        disableStackTrace: false,
      },
      errors: ['description is a required field'],
      inner: [],
      name: 'ValidationError',
      message: 'description is a required field',
    },
    {
      path: 'style.title',
      type: 'optionality',
      params: {
        path: 'style.title',
        spec: {
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          disableStackTrace: false,
          nullable: false,
          optional: false,
          coerce: true,
        },
        disableStackTrace: false,
      },
      errors: ['style.title is a required field'],
      inner: [],
      name: 'ValidationError',
      message: 'style.title is a required field',
    },
    {
      path: 'title[0].file.uploadURL',
      type: 'optionality',
      params: {
        path: 'title[0].file.uploadURL',
        spec: {
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          disableStackTrace: false,
          nullable: false,
          optional: false,
          coerce: true,
        },
        disableStackTrace: false,
      },
      errors: ['title[0].file.uploadURL is a required field'],
      inner: [],
      name: 'ValidationError',
      message: 'title[0].file.uploadURL is a required field',
    },
    {
      path: 'style.url',
      type: 'optionality',
      params: {
        path: 'style.url',
        spec: {
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          disableStackTrace: false,
          nullable: false,
          optional: false,
          coerce: true,
        },
        disableStackTrace: false,
      },
      errors: ['style.url is a required field'],
      inner: [],
      name: 'ValidationError',
      message: 'style.url is a required field',
    },
  ],
  name: 'ValidationError',
  message: '4 errors occurred',
};

const formikErr = {
  description: 'description is a required field',
  style: {
    title: 'style.title is a required field',
    url: 'style.url is a required field',
  },
  title: [
    { file: { uploadURL: 'title[0].file.uploadURL is a required field' } },
  ],
};

const ajvErr = {
  errors: [
    {
      instancePath: '',
      keyword: 'required',
      message: "must have required property 'description'",
      params: {
        missingProperty: 'description',
      },
      schemaPath: '#/required',
    },
    {
      instancePath: '/title/0/file',
      keyword: 'required',
      message: "must have required property 'uploadURL'",
      params: {
        missingProperty: 'uploadURL',
      },
      schemaPath: '#/properties/title/items/properties/file/required',
    },
    {
      instancePath: '/style',
      keyword: 'required',
      message: "must have required property 'title'",
      params: {
        missingProperty: 'title',
      },
      schemaPath: '#/properties/style/required',
    },
    {
      instancePath: '/style',
      keyword: 'required',
      message: "must have required property 'url'",
      params: {
        missingProperty: 'url',
      },
      schemaPath: '#/properties/style/required',
    },
  ],
  success: false,
};
