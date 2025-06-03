import { z } from 'zod';
import { object_variant_type } from './object_variant_type';
import { object_schema } from '../json_schema';

export const object_variant_image_choice_props = z.object({
  url: z.string(),
  title: z.string(),
  name: z.string(),
});

export const object_variant_image_choice = object_schema.extend({
  variant: z.literal(object_variant_type.Enum.object_image_choice),
  properties: object_variant_image_choice_props,
  examples: z.array(object_variant_image_choice_props),
});
