import { z } from 'zod';

const content_blocks_schema = z.object({
  id: z.number(),
  timestamp: z.string().datetime(),
  type: z.string(),
  args: z.object({
    cause: z.number().optional(),
    behavior: z.union([z.literal('append'), z.literal('replace')]),
    content_blocks: z.array(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('text'),
          content: z.string(),
        }),
        z.object({
          type: z.literal('x-button'),
          id: z.string(),
          display_text: z.string(),
        }),
      ]),
    ),
  }),
});

/**
 *
 * 考虑到 remark 实现换行有难度，先转成 directive
 */
export const contentBlocksToMDC = (
  content_blocks: z.infer<typeof content_blocks_schema>,
) => {
  const block = content_blocks.args.content_blocks[0];
  if (block.type === 'text') {
    return block.content;
  } else {
    return `:${block.type}{#${block.id} display_text='${block.display_text}'}`;
  }
  return '';
};
