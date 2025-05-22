import { ChatCommonModel, MOCK_IMG } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';
import { z } from 'zod';

export const ChatInputHandler = Symbol.for('ChatInputHandler');

export interface ChatInputHandler {
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
    @inject(ChatInputHandler) private handler: ChatInputHandler,
    @inject(ChatCommonModel) public chatCommon: ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get showSendButton() {
    return !isEmpty(this.chatCommon.inputText);
  }

  // todo: 重复代码
  async sendText() {
    if (isEmpty(this.chatCommon.inputText)) {
      return;
    }

    for await (const _ of this.handler.sendText(this.chatCommon.inputText)) {
      this.chatCommon.setInputText('');
    }
  }

  async clear() {
    for await (const _ of this.handler.clear()) {
      //
    }
  }

  removeImagePreview(id: string) {
    for (const _ of this.handler.removeImagePreview(id)) {
      // 其他操作
    }
  }
}
