import { z } from 'zod';
import { string_variant } from './string_variant/string_variant';
import { object_variant } from './object_variant/object_variant';

export const json_form_schema = z.discriminatedUnion('variant', [
  ...string_variant.options,
  ...object_variant.options,
]);
