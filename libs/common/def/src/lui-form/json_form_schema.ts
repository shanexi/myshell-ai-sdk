import { z } from 'zod';
import { object_variant } from './object_variant/object_variant';
import { string_variant } from './string_variant/string_variant';
import { string_variant_type } from './string_variant/string_variant_type';
import { object_variant_type } from './object_variant/object_variant_type';

/**
 * json schema + variant，（暂时）没有自定义字段
 * 只支持一个层级，不支持嵌套
 * 如果需要嵌套，则通过额外的 display schema 负责
 */
export const json_form_schema = z.object({
  type: z.literal('object'),
  properties: z.record(
    z.string(),
    z.discriminatedUnion('variant', [
      ...string_variant.options,
      ...object_variant.options,
    ]),
  ),
});

export type JsonFormSchema = z.infer<typeof json_form_schema>;

// 暂时先只计算 typescript type（不做 zod 校验）
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {
  //
};

// 这里面就是一个基本的 json schema（不包含 variant）
export type JsonSchema = Prettify<
  Omit<z.infer<typeof json_form_schema>, 'properties'> & {
    properties: Record<
      string,
      Omit<z.infer<typeof json_form_schema>['properties'][string], 'variant'>
    >;
  }
>;

export type LuiFormItemData = z.infer<
  typeof json_form_schema
>['properties'][string];

export const LuiFormItem = Symbol('LuiFormItem');

export type LuiFormItemVariant =
  | z.infer<typeof string_variant_type>
  | z.infer<typeof object_variant_type>;
export interface LuiFormItem {
  variant: LuiFormItemVariant;
  render: (data: LuiFormItemData) => JSX.Element;
}
