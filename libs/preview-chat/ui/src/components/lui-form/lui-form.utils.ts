import { json_schema } from '@myshell-run/common-def';
import Ajv, { ErrorObject } from 'ajv';
import { FormikErrors, setIn } from 'formik';
import { z } from 'zod';
export function ajvValidate(
  jsonschema: z.infer<typeof json_schema>,
  data: Record<string, unknown>,
) {
  const ajv = new Ajv({
    allErrors: true,
  });
  const validate = ajv.compile(jsonschema);
  const success = validate(data);
  return {
    success,
    errors: validate.errors,
  };
}

export function ajvToFormErrors(
  ajvErrors: ErrorObject<string, Record<string, any>, unknown>[] = [],
): FormikErrors<Record<string, unknown>> {
  let errors: FormikErrors<Record<string, unknown>> = {};

  for (const err of ajvErrors) {
    const path = err.instancePath
      .split('/')
      .filter((i) => i !== '')
      .concat([err.params.missingProperty])
      .join('.');
    errors = setIn(errors, path, err.message);
  }
  return errors;
}
