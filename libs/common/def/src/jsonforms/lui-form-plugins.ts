import { z } from 'zod';
import { json_schema } from './json_schema';
import { FieldProps } from 'formik';

export const FormVariantModelFactory = Symbol.for('FormVariantModelFactory');

export type FormItemJsonSchema = z.infer<
  typeof json_schema
>['properties'][string];

export const FormItem = Symbol.for('FormItem');

export interface FormItem<S, M> {
  variant: string;
  render: (jsonschema: S, fieldProps: FieldProps, model: M) => JSX.Element;
}
