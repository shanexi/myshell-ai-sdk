import { z } from 'zod';

export const ContentBlockable = Symbol.for('ContentBlockable');

export const chat_message_type = z.enum(['chat_message']);

export const content_blocks_schema = z.object({
  id: z.number(),
  message_id: z.number(),
  // timestamp: z.string().datetime(),
  timestamp: z.string(),
  source: z.union([z.literal('agent'), z.literal('user'), z.literal('server')]),
  type: z.literal(chat_message_type.Enum.chat_message),
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

export const content_block_schema = z.object({
  type: z.string(),
  content: z.object({}).passthrough(),
});

export interface ContentBlockable {
  transform(
    block: z.infer<typeof content_block_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ): string;
}

export const ContentBlockableFactory = Symbol.for('ContentBlockableFactory');

export type ContentBlockableFactory = (
  identifier: string,
  id: string,
) => ContentBlockable;
