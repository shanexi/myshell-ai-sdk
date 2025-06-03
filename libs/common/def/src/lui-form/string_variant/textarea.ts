import { z } from 'zod';
import { string_variant_type } from './string_variant_type';
import { string_schema } from '../json_schema';

export const string_variant_textarea = string_schema.extend({
  variant: z.literal(string_variant_type.Enum.string_textarea),
});
