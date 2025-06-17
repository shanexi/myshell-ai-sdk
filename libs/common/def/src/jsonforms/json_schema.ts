import { z } from 'zod';

const type = z.enum(['string', 'number', 'object', 'array', 'boolean', 'null']);

export const string_schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.literal(type.Enum.string),
  maxLength: z.number().optional(),
  minLength: z.number().optional(),
});

const object_schema = z.object({
  type: z.literal(type.Enum.object),
  title: z.string(),
  description: z.string().optional(),
  properties: z.object({}).passthrough(),
  required: z.array(z.string()).optional(),
  examples: z.array(z.object({}).passthrough()).optional(),
});

const array_schema = z.object({
  type: z.literal(type.Enum.array),
  title: z.string(),
  description: z.string().optional(),
  // todo 可以继续细化 type: object/string/number ...
  items: z.object({}).passthrough(),
  maxItems: z.number().optional(),
});

// TODO 参考 { JSONSchemaType } from 'ajv', 能否写的标准点，更 satisfy JSONSchemaType
// 现在是做了 type cast, JSONSchemaType<Value> as unknown as z.infer<typeof json_schema>,
// 但是这个 json_schema 目前主要的作用是 zod parse 后，做数据过滤（注意: passthrough 关键字），所以不紧急
export const json_schema = z.object({
  type: z.literal('object'),
  title: z.string(),
  properties: z.record(
    z.string(),
    z.discriminatedUnion('type', [object_schema, string_schema, array_schema]),
  ),
  required: z.array(z.string()).optional(),
});
