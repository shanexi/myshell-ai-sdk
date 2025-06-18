import { json_schema } from '@myshell-run/common-def';
import Ajv, { ErrorObject } from 'ajv';
import { FormikErrors, setIn } from 'formik';
import { z } from 'zod';
import { isEmpty } from 'lodash-es';
import AjvErrors from 'ajv-errors';

export function ajvValidate(
  jsonschema: z.infer<typeof json_schema>,
  data: Record<string, unknown>,
) {
  const ajv = new Ajv({
    allErrors: true,
  });
  AjvErrors(ajv);
  const validate = ajv.compile(jsonschema);
  validate(data);
  return validate.errors;
}

export function ajvToFormErrors(
  ajvErrors:
    | ErrorObject<string, Record<string, any>, unknown>[]
    | null
    | undefined,
): FormikErrors<Record<string, unknown>> {
  if (ajvErrors == null) return {};

  let errors: FormikErrors<Record<string, unknown>> = {};

  for (const err of ajvErrors) {
    const path = err.instancePath
      .split('/')
      .concat([err.params.missingProperty])
      .filter((i) => !isEmpty(i))
      .join('.');
    errors = setIn(errors, path, err.message);
  }
  return errors;
}
