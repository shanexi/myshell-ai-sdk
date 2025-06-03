import { z } from 'zod';

export const string_variant_type = z.enum([
  'string_default',
  'string_textarea',
  'string_selector',
]);
