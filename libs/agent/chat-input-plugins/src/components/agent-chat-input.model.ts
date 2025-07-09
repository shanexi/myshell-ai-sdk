import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  ChatInputDoc,
  ContextItem,
  EdixModel,
  UploadItem,
  UppyModel,
  UppyState,
} from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable, runInAction, toJS } from 'mobx';
import { isEmpty } from 'radash';
import { agentChatInputModelMap } from '../agent-chat-input-plugins.module';
import { NO_MESSAGE_ID_AGENT_CHAT_INPUT } from '../chat-input-model-factory';

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

  sendChatInputDocVariant(
    chatInputDoc: ChatInputDoc,
    upload: UploadItem[],
    context: ContextItem[],
  ): AsyncGenerator;
}

@injectable()
export class AgentChatInputModel {
  @observable loading = false;

  constructor(
    @inject(AgentChatInputHandlers)
    private handlers: AgentChatInputHandlers,
    @inject(EdixModel) public edix: EdixModel,
    @inject(UppyModel) public uppy: UppyModel,
    @inject(ChatCommonModelFactory)
    public chatCommonFactory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.chatCommonFactory(AGENT_CHAT);
  }

  @observable variant: 'message' | 'message-edit' | 'chat-input' = 'chat-input';

  @computed get isContextItemsEmpty() {
    return this.edix.addedContextItems.length === 0;
  }

  get isForbidden() {
    return this.edix.edixReadonly && this.variant == 'chat-input';
  }

  get showAtContext() {
    return this.variant === 'chat-input' || this.variant === 'message-edit';
  }

  /**
   * @description chat input message 形态收到消息后的初始设置
   */
  setupMessage(
    chatInputDoc: ChatInputDoc,
    uploadItems: UppyState[],
    context: ContextItem[],
  ) {
    runInAction(() => {
      this.variant = 'message';
    });
    // TODO 还有 context
    this.edix.setChatInputDoc(chatInputDoc);
    this.uppy.setInitialUppyState(uploadItems);
    this.edix.setEdixReadonly(true);
  }

  /**
   * @description chat input message 编辑态
   * 会根据 messageId 将其他 chat input message enableMessage
   */
  enableInput(messageId: string = NO_MESSAGE_ID_AGENT_CHAT_INPUT) {
    runInAction(() => {
      if (messageId === NO_MESSAGE_ID_AGENT_CHAT_INPUT) {
        this.variant = 'chat-input';
      } else {
        this.variant = 'message-edit';
      }
    });
    this.edix.setEdixReadonly(false);
    this.chatCommon.setEnabledChatInputMessageKey(messageId);

    if (messageId !== NO_MESSAGE_ID_AGENT_CHAT_INPUT) {
      const messageIndex =
        this.chatCommon.virtuoso.virtuosoRef?.current?.data.findIndex(
          (item) => {
            return item.key === messageId;
          },
        );
      if (messageIndex != null) {
        this.chatCommon.virtuoso.virtuosoRef?.current?.data.map(
          (item, index) => {
            if (index > messageIndex) {
              return { ...item, toDelete: true };
            } else {
              if (item.toDelete) {
                delete item.toDelete;
              }
              return item;
            }
          },
          'auto',
        );
      }
    } else {
      this.chatCommon.virtuoso.virtuosoRef?.current?.data.map((item, index) => {
        if (item.toDelete) {
          delete item.toDelete;
        }
        return item;
      }, 'auto');
    }

    for (const [key, model] of agentChatInputModelMap.entries()) {
      if (key === NO_MESSAGE_ID_AGENT_CHAT_INPUT) continue;
      if (key !== messageId) {
        model.enableMessage();
      }
    }
  }

  enableMessage() {
    runInAction(() => {
      this.variant = 'message';
    });
    this.edix.setEdixReadonly(true);
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
   * TODO 暂时没想好怎么 plugin 化
   */
  async sendText() {
    if (isEmpty(this.edix.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(this.edix.inputText)) {
      await this.edix.clearEdix();
    }
  }

  /**
   * TODO 如何优化
   * 一个变体（chat landing page）发送消息的变体
   */
  async sendChatInputDocVariant() {
    if (!this.canSend || /* 回车选中 */ this.edix.isContextMenuShow) {
      return;
    }
    // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper 方便调试
    const chatInputDoc = toJS(this.edix.chatInputDoc);
    const uploads = toJS(this.uppy.previewItems).map((item) => ({
      ...item,
      // toJS 不支持嵌套，也不清楚这里怎么就 observable 了，先手动 toJS
      response: toJS(item.response),
    }));
    const contexts = this.edix.addedContextItems.map((item) => toJS(item));

    this.loading = true;
    // variant
    for await (const _ of this.handlers.sendChatInputDocVariant(
      chatInputDoc,
      uploads,
      contexts,
    )) {
      this.loading = false;
      await this.edix.clearEdix();
      this.edix.addedContextMap.clear();
      this.uppy.clear();
    }
  }

  async sendChatInputDoc() {
    if (!this.canSend || /* 回车选中 */ this.edix.isContextMenuShow) {
      return;
    }
    // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper 方便调试
    const chatInputDoc = toJS(this.edix.chatInputDoc);
    const uploads = toJS(this.uppy.previewItems).map((item) => ({
      ...item,
      // toJS 不支持嵌套，也不清楚这里怎么就 observable 了，先手动 toJS
      response: toJS(item.response),
    }));
    const contexts = this.edix.addedContextItems.map((item) => toJS(item));

    for await (const _ of this.handlers.sendChatInputDoc(
      // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper
      chatInputDoc,
      uploads,
      contexts,
    )) {
      const messageId = this.chatCommon.getEnabledChatInputMessageId();
      if (/* 代表 restore message */ messageId) {
        // 则需要进行删除 包括自身消息也要删除
        // 因为会重新 append（message id 需要更改）
        this.chatCommon.virtuoso.virtuosoRef?.current?.data.findAndDelete(
          (item) => {
            return (
              item.toDelete === true ||
              item.key === this.chatCommon.enabledChatInputMessageKey
            );
          },
        );
      }

      this.chatCommon.setEnabledChatInputMessageKey(
        NO_MESSAGE_ID_AGENT_CHAT_INPUT,
      );

      await this.edix.clearEdix();
      this.edix.addedContextMap.clear();
      this.uppy.clear();
    }
  }

  removeImagePreview(id: string) {
    this.uppy.removeFile(id);
  }
}
