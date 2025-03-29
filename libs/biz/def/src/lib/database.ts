import { z } from 'zod';

export const bot = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  avatar: z.string().optional(),
  isOfficial: z.boolean(),
  llmModelId: z.string().optional(),
});

export type DbBot = z.infer<typeof bot>;

const message = z.object({
  id: z.string(),
  createdAt: z.date().optional(),
  sessionId: z.string(),
  text: z.string(),
  senderId: z.string(),
});

export type DbMessage = z.infer<typeof message>;

export interface Database {
  bot: DbBot;
  message: DbMessage;
}
