import { json_schema } from '@myshell-run/common-def';
import Ajv from 'ajv';
import { z } from 'zod';

export function validate(
  jsonschema: z.infer<typeof json_schema>,
  data: unknown,
) {
  const ajv = new Ajv({
    allErrors: true,
  });
  const validate = ajv.compile(jsonschema);
  return {
    success: validate(data),
    errors: validate.errors,
  };
}
