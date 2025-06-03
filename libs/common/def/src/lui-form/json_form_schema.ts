import { z } from 'zod';
import { string_variant } from './string_variant/string_variant';
import { object_variant } from './object_variant/object_variant';

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
