import { Remarkable, StrictMessage } from '@myshell-run/common-def';
import { escapeForAttribute, parseDirective } from '@myshell-run/common-ui';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import {
  content_blocks_schema,
  ContentBlockable,
} from '../remark/content-blockable';
import { LeafDirective } from 'mdast-util-directive';
import { REPLY_MESSAGE_TYPE } from '../../types';

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

  transform(
    block: z.infer<typeof think_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
    message?: StrictMessage,
  ) {
    const text = escapeForAttribute(block.content.text);
    if (
      chunk.cause ||
      !message ||
      message.type !==
        /* 替换场景，有可能是前置消息不是 content block */ REPLY_MESSAGE_TYPE
    ) {
      return `::x-think{#${chunk.message_id} text="${text}"}`;
    } else {
      const directive = parseDirective(message.text);
      const lastText = (directive.children[0] as LeafDirective).attributes
        ?.text;
      if (lastText == null) {
        console.warn(
          'parse diretive failed, fallback to replace',
          message.text,
        );
        return `::x-think{#${chunk.message_id} text="${text}"}`;
      } else {
        const nextText = [escapeForAttribute(lastText), text]
          .filter((i) => i != null)
          .join('&#10;');
        return `::x-think{#${chunk.message_id} text="${nextText}"}`;
      }
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
