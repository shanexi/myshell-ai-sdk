import { z } from 'zod';
import { jsonschema } from './json_schema';

export const LuiFormVariantModelFactory = Symbol.for(
  'LuiFormVariantModelFactory',
);

export type LuiFormItemJsonSchema = z.infer<
  typeof jsonschema
>['properties'][string];

export const LuiFormItem = Symbol('LuiFormItem');

export interface LuiFormItem<S, M> {
  variant: string;
  render: (jsonschema: S, model: M) => JSX.Element;
}
