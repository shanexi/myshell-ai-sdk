import { json_schema } from '@myshell-run/common-def';
import { validateYupSchema } from 'Formik';
import * as yup from 'yup';
import { z } from 'zod';
import { demo_jsonschema } from './__storybook__/demo_form';
import { ajvToFormErrors, ajvValidate } from './lui-form.utils';

const data = {
  description: '',
  title: [
    {
      file: {
        // uploadURL: 'https://example.com/upload',
        name: 'example.png',
      },
    },
  ],
  style: {
    name: 'John Doe',
    // title: 'example.png',
    // url: 'https://example.com/upload',
  },
};

it('formik errors', async () => {
  const demo_yup_schema = yup.object({
    description: yup.string().max(280).required(),
    title: yup
      .array()
      .of(
        yup.object({
          file: yup
            .object({
              uploadURL: yup.string().required(),
              name: yup.string().required(),
            })
            .required(),
        }),
      )
      .max(1)
      .required(),
    style: yup
      .object({
        name: yup.string().required(),
        title: yup.string().required(),
        url: yup.string().required(),
      })
      .required(),
  });
  try {
    await validateYupSchema(data, demo_yup_schema);
  } catch (e) {
    // console.log(JSON.stringify(e));
    // console.log(JSON.stringify(yupToFormErrors(e)));
  }
});

it('ajv validate', () => {
  const valid = ajvValidate(
    demo_jsonschema as unknown as z.infer<typeof json_schema>,
    data,
  );
  expect(valid).toMatchInlineSnapshot(`
    [
      {
        "instancePath": "/description",
        "keyword": "minLength",
        "message": "must NOT have fewer than 1 characters",
        "params": {
          "limit": 1,
        },
        "schemaPath": "#/properties/description/minLength",
      },
      {
        "instancePath": "/title/0/file",
        "keyword": "required",
        "message": "must have required property 'uploadURL'",
        "params": {
          "missingProperty": "uploadURL",
        },
        "schemaPath": "#/properties/title/items/properties/file/required",
      },
      {
        "instancePath": "/style",
        "keyword": "required",
        "message": "must have required property 'title'",
        "params": {
          "missingProperty": "title",
        },
        "schemaPath": "#/properties/style/required",
      },
      {
        "instancePath": "/style",
        "keyword": "required",
        "message": "must have required property 'url'",
        "params": {
          "missingProperty": "url",
        },
        "schemaPath": "#/properties/style/required",
      },
    ]
  `);
});

it('ajv errors to formik errors', () => {
  const arr = [
    // {
    //   instancePath: '',
    //   keyword: 'required',
    //   message: "must have required property 'description'",
    //   params: {
    //     missingProperty: 'description',
    //   },
    //   schemaPath: '#/required',
    // },
    {
      instancePath: '/description',
      keyword: 'minLength',
      message: 'must NOT have fewer than 1 characters',
      params: {
        limit: 1,
      },
      schemaPath: '#/properties/description/minLength',
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
  ];
  // const exp = {
  //   description: 'description is a required field',
  //   style: {
  //     title: 'style.title is a required field',
  //     url: 'style.url is a required field',
  //   },
  //   title: [
  //     { file: { uploadURL: 'title[0].file.uploadURL is a required field' } },
  //   ],
  // };
  const act = ajvToFormErrors(arr);
  expect(act).toMatchInlineSnapshot(`
    {
      "description": "must NOT have fewer than 1 characters",
      "style": {
        "title": "must have required property 'title'",
        "url": "must have required property 'url'",
      },
      "title": [
        {
          "file": {
            "uploadURL": "must have required property 'uploadURL'",
          },
        },
      ],
    }
  `);
});
