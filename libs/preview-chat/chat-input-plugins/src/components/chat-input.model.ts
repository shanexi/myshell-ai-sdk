import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { isEmpty } from 'radash';
import { z } from 'zod';

export type ContextType = 'file' | 'text' | 'json' | 'todo' | 'message';

export const ChatInputHandlers = Symbol.for('PreviewChatInputHandlers');
export interface ChatInputHandlers {
  clear(): AsyncGenerator;
  sendText(text: string): AsyncGenerator;
  removeImagePreview(id: string): Generator;
}

export const previewTypeSchema = z.discriminatedUnion('previewType', [
  z.object({
    previewType: z.literal('image'),
    name: z.string(),
    previewUrl: z.string(),
    subType: z.union([z.literal('png'), z.literal('jpeg')]),
  }),
  z.object({
    previewType: z.literal('file'),
    name: z.string(),
    desc: z.string().optional(),
    subType: z.union([z.literal('rtf'), z.literal('json')]),
  }),
]);

@injectable()
export class ChatInputModel {
  constructor(
    @inject(ChatInputHandlers) private handlers: ChatInputHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }

  get showSendButton() {
    return !isEmpty(this.chatCommon.inputText);
  }

  async sendText() {
    if (isEmpty(this.chatCommon.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(this.chatCommon.inputText)) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.clearEdix();
    }
  }

  async clear() {
    for await (const _ of this.handlers.clear()) {
      //
    }
  }

  removeImagePreview(id: string) {
    for (const _ of this.handlers.removeImagePreview(id)) {
      // 其他操作
    }
  }
}
