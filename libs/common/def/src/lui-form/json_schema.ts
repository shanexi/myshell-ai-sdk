import { z } from 'zod';

export const type = z.enum([
  'string',
  'number',
  'object',
  'array',
  'boolean',
  'null',
]);

export const common_fields = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const string_schema = common_fields.extend({
  type: z.literal(type.Enum.string),
});

export const string_enum_schema = z.array(z.string());

export const object_schema = common_fields.extend({
  type: z.literal(type.Enum.object),
});
