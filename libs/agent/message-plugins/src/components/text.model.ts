import { injectable } from 'inversify';
import { z } from 'zod';
import {
  content_blocks_schema,
  ContentBlockable,
} from './remark/content-blockable';
import { StrictMessage } from '@myshell-run/common-def';

export const text_schema = z.object({
  type: z.literal('text'),
  content: z.object({
    text: z.string(),
  }),
});

@injectable()
export class TextModel implements ContentBlockable {
  getLastText(message: StrictMessage): string {
    return message.text;
  }

  transform(
    block: z.infer<typeof text_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
    message: StrictMessage,
  ): string {
    if (!message) return block.content.text;
    if (chunk.cause) {
      return block.content.text;
    } else {
      return message.text + block.content.text;
    }
  }
}
