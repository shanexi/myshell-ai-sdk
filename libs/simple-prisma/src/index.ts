import { z } from 'zod';

export const bot = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  avatar: z.string().optional(),
  isOfficial: z.boolean(),
});

export type Bot = z.infer<typeof bot>;

export const message = z.object({
  id: z.string(),
  createdAt: z.date().optional(),
  sessionId: z.string(),
  text: z.string(),
  senderId: z.string(),
});

export type Message = z.infer<typeof message>;
export interface Database {
  bot: Bot;
  message: Message;
}
