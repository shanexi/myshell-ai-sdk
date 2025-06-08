import { z } from 'zod';

const type = z.enum(['string', 'number', 'object', 'array', 'boolean', 'null']);

const string_schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.literal(type.Enum.string),
});

const object_schema = z.object({
  type: z.literal(type.Enum.object),
  title: z.string(),
  description: z.string().optional(),
  properties: z.object({}).passthrough(),
  examples: z.array(z.object({}).passthrough()).optional(),
});

export const json_schema = z.object({
  type: z.literal('object'),
  title: z.string(),
  properties: z.record(
    z.string(),
    z.discriminatedUnion('type', [object_schema, string_schema]),
  ),
});
