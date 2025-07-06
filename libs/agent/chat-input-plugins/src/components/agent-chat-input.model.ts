import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
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

  removeImagePreview(id: string): Generator;
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
    @inject(AgentChatInputHandlers) private handlers: AgentChatInputHandlers,
    @inject(EdixModel) private edix: EdixModel,
    @inject(UppyModel) private uppy: UppyModel,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  @computed get isContextItemsEmpty() {
    return this.edix.addedContextItems.length === 0;
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  get canSend() {
    return (
      !isEmpty(this.chatCommon.edixModel.inputText) ||
      !this.chatCommon.edixModel.isChatInputDocEmpty ||
      !isEmpty(this.chatCommon.uppyModel.previewItems)
    );
  }

  /**
   * @deprecated 推荐使用 @see sendChatInputDoc
   */
  async sendText() {
    if (isEmpty(this.chatCommon.edixModel.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(
      this.chatCommon.edixModel.inputText,
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.edixModel.clearEdix();
    }
  }

  async sendChatInputDoc() {
    if (
      !this.canSend ||
      /* 回车选中 */ this.chatCommon.edixModel.isContextMenuShow
    ) {
      return;
    }

    for await (const _ of this.handlers.sendChatInputDoc(
      // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper
      toJS(this.chatCommon.edixModel.chatInputDoc),
      toJS(this.chatCommon.uppyModel.previewItems).map((item) => ({
        ...item,
        // toJS 不支持嵌套，也不清楚这里怎么就 observable 了，先手动 toJS
        response: toJS(item.response),
      })),
      this.chatCommon.edixModel.addedContextItems.map((item) => toJS(item)),
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.edixModel.clearEdix();
      this.chatCommon.edixModel.addedContextMap.clear();
      this.chatCommon.uppyModel.clear();
    }
  }

  removeImagePreview(id: string) {
    // todo: 已经有了 chatCommon 似乎不需要 delegate 给外部 handlers
    for (const _ of this.handlers.removeImagePreview(id)) {
      // 其他操作
    }
  }
}
