import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import { content_blocks_schema } from '../remark/content-blocks-to-mdc';
import { ContentBlockable } from '../remark/content-blockable';

/**
 * 换成 http entity，在 html 不需要 decode（因为是 escape 而非 encode？）
 */
export function escapeForAttribute(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '&#10;'); // 换行
  // .replace(/\n/g, '\\n');  // 显示为 \n
}

export const think_schema = z.object({
  type: z.literal('think'),
  content: z.object({
    text: z.string(),
  }),
});

export const transformThink = (
  block: z.infer<typeof think_schema>,
  chunk: z.infer<typeof content_blocks_schema>,
) => {
  return `::x-think{#${chunk.message_id} chunk_id="${chunk.id}" text="${escapeForAttribute(block.content.text)}"}`;
};

@injectable()
export class ThinkModel implements Remarkable, ContentBlockable {
  @observable isOpen = true;
  @observable text?: string;

  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    this.setText(props.chunk_id as string, props.text as string);
  }

  transform(
    block: z.infer<typeof think_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ): string {
    return `::x-think{#${chunk.message_id} chunk_id="${chunk.id}" text="${escapeForAttribute(block.content.text)}"}`;
  }

  @action.bound
  setText(chunkId: string, text: string) {
    this.text = text;
  }

  @action.bound
  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  @action.bound
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
