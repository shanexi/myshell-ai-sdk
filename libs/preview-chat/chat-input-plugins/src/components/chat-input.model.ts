import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import { ChatCommonModel, MOCK_IMG } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';
import { z } from 'zod';

export const ChatInputHandlers = Symbol.for('ChatInputHandlers');
export type ContextType = 'file' | 'text' | 'json' | 'todo' | 'message';
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
  @observable contextItems = observable.array<{
    type: ContextType;
    name: string;
  }>([
    { type: 'file', name: 'requirement.feature1' },
    { type: 'json', name: 'canvas.state1.inputs.variable1' },
    { type: 'todo', name: 'test.test_suite1' },
    { type: 'message', name: 'preview.message1' },
  ]);

  @observable previewItems = observable.array<
    z.infer<typeof previewTypeSchema>
  >([
    {
      previewType: 'image',
      subType: 'png',
      name: 'a mock image',
      previewUrl: MOCK_IMG,
    },
    {
      previewType: 'file',
      subType: 'rtf',
      name: 'Untitled.rtf',
      desc: 'Rich Text File',
    },
  ]);

  constructor(
    @inject(ChatInputHandlers) private handlers: ChatInputHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  @computed get isContextItemsEmpty() {
    return this.contextItems.length === 0;
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

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  async sendChatInputDoc() {
    if (isEmpty(this.chatCommon.chatInputDoc)) {
      return;
    }
    const text = this.chatCommon.chatInputDoc
      .map((line) => line.map((v) => v.text).join(' '))
      .join('\n');

    for await (const _ of this.handlers.sendText(text)) {
      // this.chatCommon.setInputText('');
      this.chatCommon.setChatInputDoc([]);
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
