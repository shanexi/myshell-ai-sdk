import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import { ContentBlockableImpl } from '../remark/content-blockable-manager';
import { content_blocks_schema } from '../remark/content-blocks-to-mdc';

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

@injectable()
export class ThinkModel extends ContentBlockableImpl implements Remarkable {
  @observable isOpen = true;
  @observable text?: string;

  constructor() {
    super();
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    this.setText(props.chunk_id as string, props.text as string);
  }

  textField(block: z.infer<typeof think_schema>) {
    return escapeForAttribute(block.content.text);
  }

  doTransform(
    block: z.infer<typeof think_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ) {
    return `::x-think{#${chunk.message_id} chunk_id="${chunk.id}" text="${this.getText(block, chunk)}"}`;
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
