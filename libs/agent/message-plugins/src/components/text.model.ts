import { injectable } from 'inversify';
import { z } from 'zod';
import { ContentBlockable } from './remark/content-blockable';
import { content_blocks_schema } from './remark/content-blocks-to-mdc';

export const text_schema = z.object({
  type: z.literal('text'),
  content: z.object({
    text: z.string(),
  }),
});

@injectable()
export class TextModel implements ContentBlockable {
  transform(
    block: z.infer<typeof text_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ): string {
    return block.content.text;
  }
}
