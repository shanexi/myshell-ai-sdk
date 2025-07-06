import {
  ChatInputDoc,
  context_schema,
  ContextItem,
  EdixModel,
  UploadItem,
  UppyModel,
} from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, toJS } from 'mobx';
import { isEmpty } from 'radash';
import { z } from 'zod';

export const AgentChatInputHandlers = Symbol.for('AgentChatInputHandlers');

export interface AgentChatInputHandlers {
  /**
   * @deprecated 推荐使用 sendChatInputDoc
   * @description chat input 字符串， eg.g chat-input-textarea-plugin 和 chat-input-advanced-input-plugin
   */
  sendText(text: string): AsyncGenerator;

  /**
   * @description chat input 结构化数据， eg.g chat-input-structured-input-plugin
   */
  sendChatInputDoc(
    chatInputDoc: ChatInputDoc,
    upload: UploadItem[],
    context: ContextItem[],
  ): AsyncGenerator;
}

export const chat_message_schema = z.object({
  request_id: z.string().optional(),
  type: z.literal('chat_message'),
  args: z.object({
    // context: z.array(
    //   z.object({
    //     type: z.literal('image'),
    //     content: z.object({
    //       name: z.string(),
    //       url: z.string(),
    //     }),
    //   }),
    // ),
    context: z.array(context_schema),
    content_blocks: z.array(
      z.object({
        type: z.literal('text'),
        content: z.object({
          text: z.string(),
        }),
      }),
    ),
  }),
});

@injectable()
export class AgentChatInputModel {
  constructor(
    @inject(AgentChatInputHandlers)
    private handlers: AgentChatInputHandlers,
    @inject(EdixModel) public edix: EdixModel,
    @inject(UppyModel) public uppy: UppyModel,
  ) {
    makeObservable(this);
  }

  @computed get isContextItemsEmpty() {
    return this.edix.addedContextItems.length === 0;
  }

  get canSend() {
    return (
      !isEmpty(this.edix.inputText) ||
      !this.edix.isChatInputDocEmpty ||
      !isEmpty(this.uppy.previewItems)
    );
  }

  /**
   * @deprecated 推荐使用 @see sendChatInputDoc
   */
  async sendText() {
    if (isEmpty(this.edix.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(this.edix.inputText)) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.setInputText('');
      await this.edix.clearEdix();
    }
  }

  async sendChatInputDoc() {
    if (!this.canSend || /* 回车选中 */ this.edix.isContextMenuShow) {
      return;
    }

    for await (const _ of this.handlers.sendChatInputDoc(
      // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper
      toJS(this.edix.chatInputDoc),
      toJS(this.uppy.previewItems).map((item) => ({
        ...item,
        // toJS 不支持嵌套，也不清楚这里怎么就 observable 了，先手动 toJS
        response: toJS(item.response),
      })),
      this.edix.addedContextItems.map((item) => toJS(item)),
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.setInputText('');
      await this.edix.clearEdix();
      this.edix.addedContextMap.clear();
      this.uppy.clear();
    }
  }

  removeImagePreview(id: string) {
    this.uppy.removeFile(id);
  }
}
