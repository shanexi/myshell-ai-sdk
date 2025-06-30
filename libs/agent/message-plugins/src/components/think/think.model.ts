import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
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

export const transformThink = (
  block: z.infer<typeof think_schema>,
  chunk: z.infer<typeof content_blocks_schema>,
) => {
  return `::x-think{#${chunk.message_id} chunk_id="${chunk.id}" text="${escapeForAttribute(block.content.text)}"}`;
};

@injectable()
export class ThinkModel implements Remarkable {
  @observable isOpen = true;
  @observable text = '';
  private appendedChunkIDs: Set<string> = new Set();

  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    this.setText(props.chunk_id as string, props.text as string);
  }

  @action.bound
  setText(chunkId: string, text: string) {
    // @virtuoso.dev/message-list 在进入 viewport 会 re render
    // 所以操作必须 idempotent
    console.log('chunkId', chunkId);
    if (this.appendedChunkIDs.has(chunkId)) {
      return;
    }
    this.appendedChunkIDs.add(chunkId);
    // TODO #23
    if (this.text === '') {
      // 处理一个换行
      this.text = text;
    } else {
      this.text = this.text + '\n' + text;
    }
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
