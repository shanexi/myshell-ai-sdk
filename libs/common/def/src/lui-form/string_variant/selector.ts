import { z } from 'zod';

import { string_enum_schema, string_schema } from '../json_schema';
import { string_variant_type } from './string_variant_type';

export const string_variant_selector = string_schema.extend({
  variant: z.literal(string_variant_type.Enum.string_selector),
  enum: string_enum_schema,
});
