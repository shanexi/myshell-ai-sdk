import { z } from 'zod';

export const object_variant_type = z.enum([
  'object_default',
  'object_image_upload',
  'object_image_choice',
]);
