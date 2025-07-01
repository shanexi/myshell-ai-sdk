import { z } from 'zod';
import {
  content_block_schema,
  content_blocks_schema,
} from './content-blocks-to-mdc';

export const ContentBlockable = Symbol.for('ContentBlockable');

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
