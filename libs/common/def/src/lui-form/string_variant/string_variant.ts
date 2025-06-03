import { z } from 'zod';
import { string_schema } from '../json_schema';
import { string_variant_selector } from './selector';
import { string_variant_textarea } from './textarea';
import { string_variant_type } from './string_variant_type';

const default_variant = string_schema.extend({
  variant: z.literal(string_variant_type.Enum.string_default),
});

export const string_variant = z.discriminatedUnion('variant', [
  default_variant,
  string_variant_selector,
  string_variant_textarea,
]);
