import { json_schema } from '@myshell-run/common-def';
import { validateYupSchema } from 'Formik';
import * as yup from 'yup';
import { z } from 'zod';
import {
  demo_jsonschema,
  demo_jsonschema_custom_error_message,
} from './__storybook__/demo_form';
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
  const valid = ajvValidate(
    demo_jsonschema as unknown as z.infer<typeof json_schema>,
    data,
  );
  const arr = valid;
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

it('ajv validate custom error message', () => {
  const valid = ajvValidate(
    demo_jsonschema_custom_error_message as unknown as z.infer<
      typeof json_schema
    >,
    data,
  );
  expect(valid).toMatchInlineSnapshot(`
    [
      {
        "instancePath": "/description",
        "keyword": "errorMessage",
        "message": "Description must be at least 1 character long",
        "params": {
          "errors": [
            {
              "emUsed": true,
              "instancePath": "/description",
              "keyword": "minLength",
              "message": "must NOT have fewer than 1 characters",
              "params": {
                "limit": 1,
              },
              "schemaPath": "#/properties/description/minLength",
            },
          ],
        },
        "schemaPath": "#/properties/description/errorMessage",
      },
      {
        "instancePath": "/title/0/file",
        "keyword": "errorMessage",
        "message": "File information is required",
        "params": {
          "errors": [
            {
              "emUsed": true,
              "instancePath": "/title/0/file",
              "keyword": "required",
              "message": "must have required property 'uploadURL'",
              "params": {
                "missingProperty": "uploadURL",
              },
              "schemaPath": "#/properties/title/items/properties/file/required",
            },
          ],
        },
        "schemaPath": "#/properties/title/items/properties/file/errorMessage",
      },
      {
        "instancePath": "/style",
        "keyword": "errorMessage",
        "message": "Style configuration is required",
        "params": {
          "errors": [
            {
              "emUsed": true,
              "instancePath": "/style",
              "keyword": "required",
              "message": "must have required property 'title'",
              "params": {
                "missingProperty": "title",
              },
              "schemaPath": "#/properties/style/required",
            },
            {
              "emUsed": true,
              "instancePath": "/style",
              "keyword": "required",
              "message": "must have required property 'url'",
              "params": {
                "missingProperty": "url",
              },
              "schemaPath": "#/properties/style/required",
            },
          ],
        },
        "schemaPath": "#/properties/style/errorMessage",
      },
    ]
  `);
});

it('ajv errors to formik errors custom error message', () => {
  const valid = ajvValidate(
    demo_jsonschema_custom_error_message as unknown as z.infer<
      typeof json_schema
    >,
    data,
  );
  const arr = valid;
  const act = ajvToFormErrors(arr);
  expect(act).toMatchInlineSnapshot(`
    {
      "description": "Description must be at least 1 character long",
      "style": "Style configuration is required",
      "title": [
        {
          "file": "File information is required",
        },
      ],
    }
  `);
});
