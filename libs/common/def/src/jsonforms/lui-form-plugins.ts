import { z } from 'zod';
import { json_schema } from './json_schema';
import { FieldProps } from 'formik';

export const LuiFormVariantModelFactory = Symbol('LuiFormVariantModelFactory');

export type LuiFormItemJsonSchema = z.infer<
  typeof json_schema
>['properties'][string];

export const LuiFormItem = Symbol('LuiFormItem');

export interface LuiFormItem<S, M> {
  variant: string;
  render: (jsonschema: S, fieldProps: FieldProps, model: M) => JSX.Element;
}
