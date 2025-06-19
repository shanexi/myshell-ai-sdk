import { json_schema } from '@myshell-run/common-def';
import { validateYupSchema } from 'Formik';
import * as yup from 'yup';
import { z } from 'zod';
import {
  demo_jsonschema,
  demo_jsonschema_custom_error_message,
} from './__storybook__/demo_form';
import { ajvToFormErrors, ajvValidate } from './form.utils';

describe('ajv valdiate', () => {
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
          "instancePath": "",
          "keyword": "required",
          "message": "must have required property 'age'",
          "params": {
            "missingProperty": "age",
          },
          "schemaPath": "#/required",
        },
        {
          "instancePath": "",
          "keyword": "required",
          "message": "must have required property 'team_member'",
          "params": {
            "missingProperty": "team_member",
          },
          "schemaPath": "#/required",
        },
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

  it('ajv to formik errors', () => {
    const valid = ajvValidate(
      demo_jsonschema as unknown as z.infer<typeof json_schema>,
      data,
    );
    const arr = valid;
    const act = ajvToFormErrors(arr);
    expect(act).toMatchInlineSnapshot(`
      {
        "age": "must have required property 'age'",
        "description": "must NOT have fewer than 1 characters",
        "style": {
          "title": "must have required property 'title'",
          "url": "must have required property 'url'",
        },
        "team_member": "must have required property 'team_member'",
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
});

describe('custom error message', () => {
  const data = {
    description: '',
    title: [
      {
        file: {
          uploadURL: 'https://example.com/upload',
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
          "message": "should not be empty",
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
          "instancePath": "/style",
          "keyword": "errorMessage",
          "message": "Must have url",
          "params": {
            "errors": [
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
        {
          "instancePath": "/style",
          "keyword": "errorMessage",
          "message": "Must have title",
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
            ],
          },
          "schemaPath": "#/properties/style/errorMessage",
        },
      ]
    `);
  });

  it('ajv to formik errors', () => {
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
        "description": "should not be empty",
        "style": {
          "title": "Must have title",
          "url": "Must have url",
        },
      }
    `);
  });
});
