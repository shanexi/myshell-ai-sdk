import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import {
  content_blocks_schema,
  ContentBlockable,
} from '../remark/content-blockable';

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

/**
 * todo: 统一处理这种 ContentBlockable
 */
@injectable()
export class ThinkModel implements Remarkable, ContentBlockable {
  @observable isOpen = true;
  /**
   * 存储上一次的值
   */
  private text?: string;
  /**
   * 确保 idempotent
   * todo: 是否有更好的方法
   */
  private chunkIdSet: Set<number> = new Set();

  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    // text 更新交给了 @virtuoso.dev/message-list
    // see https://github.com/myshell-ai/myshell-chat/issues/36
  }

  transform(
    block: z.infer<typeof think_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ) {
    if (this.chunkIdSet.has(chunk.id)) {
      return `::x-${block.type}{#${chunk.message_id} text="${this.text}"}`;
    }
    this.chunkIdSet.add(chunk.id);

    const text =
      escapeForAttribute(block.content.text) + /* 手动增加换行*/ '&#10;';
    if (chunk.cause) {
      this.text = text;
    } else {
      this.text = [this.text, text].filter((i) => i != null).join('');
    }
    return `::x-think{#${chunk.message_id} text="${this.text}"}`;
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
