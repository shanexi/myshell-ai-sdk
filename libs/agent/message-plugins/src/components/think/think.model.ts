import { Remarkable, StrictMessage } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import {
  content_blocks_schema,
  ContentBlockable,
} from '../remark/content-blockable';
import { escapeForAttribute, parseDirective } from '@myshell-run/common-ui';

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
  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    // text 更新交给了 @virtuoso.dev/message-list
    // see https://github.com/myshell-ai/myshell-chat/issues/36
  }

  getLastText(message: StrictMessage): string {
    const directives = parseDirective(message.text);
    const text = directives[0]?.attributes?.text;
    if (!text) {
      throw new Error(`invalid directive ${message.text}`);
    }
    return text;
  }

  transform(
    block: z.infer<typeof think_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
    message: StrictMessage,
  ) {
    const text = escapeForAttribute(block.content.text);
    if (chunk.cause || !message?.text) {
      return `::x-think{#${chunk.message_id} text="${text}"}`;
    }

    const directives = parseDirective(message.text);
    const lastText = directives[0]?.attributes?.text;
    if (!lastText) {
      throw new Error(`invalid directive ${message.text}`);
    }
    return `::x-think{#${chunk.message_id} text="${escapeForAttribute(lastText) + '&#10;' + text}"}`;
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
