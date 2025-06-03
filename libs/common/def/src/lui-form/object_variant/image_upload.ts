import { z } from 'zod';
import { object_variant_type } from './object_variant_type';
import { object_schema, type } from '../json_schema';

export const object_variant_image_upload_props = z.object({
  url: z.object({
    type: z.literal(type.Enum.string),
  }),
  title: z.object({
    type: z.literal(type.Enum.string),
  }),
});

export const object_variant_image_upload_example = z.object({
  url: z.string(),
  title: z.string(),
});

export const object_variant_image_upload = object_schema.extend({
  variant: z.literal(object_variant_type.Enum.object_image_upload),
  properties: object_variant_image_upload_props,
  examples: z.array(object_variant_image_upload_example).optional(),
});
