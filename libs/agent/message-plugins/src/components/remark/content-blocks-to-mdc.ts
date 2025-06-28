import { z } from 'zod';

export const chat_message_type = z.enum(['chat_message']);

export const content_blocks_schema = z.object({
  id: z.number(),
  message_id: z.number(),
  // timestamp: z.string().datetime(),
  timestamp: z.string(),
  source: z.union([z.literal('agent'), z.literal('user'), z.literal('server')]),
  type: chat_message_type,
  cause: z
    .number()
    .optional()
    .describe(
      'cause 是一个语义不明确的字段，来自于 openhands，目前的含义是如果有，则替 message_id 内容 ',
    ),
  args: z.object({
    content_blocks: z.array(
      z.object({
        type: z.string(),
        content: z.object({}).passthrough(),
      }),
    ),
  }),
});
