import { z } from 'zod';

const type = z.enum(['string', 'number', 'object', 'array', 'boolean', 'null']);

export const string_schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.literal(type.Enum.string),
  maximum: z.number().optional(),
});

const object_schema = z.object({
  type: z.literal(type.Enum.object),
  title: z.string(),
  description: z.string().optional(),
  properties: z.object({}).passthrough(),
  examples: z.array(z.object({}).passthrough()).optional(),
});

const array_schema = z.object({
  type: z.literal(type.Enum.array),
  title: z.string(),
  description: z.string().optional(),
  items: z.object({}).passthrough(),
  maxItems: z.number().optional(),
});

// JSONSchemaType } from 'ajv' 能否写的标准点，更 satisfy JSONSchemaType
export const json_schema = z.object({
  type: z.literal('object'),
  title: z.string(),
  properties: z.record(
    z.string(),
    z.discriminatedUnion('type', [object_schema, string_schema, array_schema]),
  ),
});
