import { z } from 'zod';
import { object_variant_image_choice } from './image_choice';
import { object_variant_image_upload } from './image_upload';
import { object_variant_type } from './object_variant_type';
import { object_schema } from '../json_schema';

const default_variant = object_schema.extend({
  variant: z.literal(object_variant_type.Enum.object_default),
});

export const object_variant = z.discriminatedUnion('variant', [
  default_variant,
  object_variant_image_upload,
  object_variant_image_choice,
]);
