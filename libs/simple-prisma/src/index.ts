import { z } from 'zod';

export const bot = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  avatar: z.string().optional(),
  isOfficial: z.boolean(),
});

export type Bot = z.infer<typeof bot>;

export interface Database {
  bot: Bot;
}
