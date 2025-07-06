import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  ChatInputDoc,
  ContextItem,
  EdixModel,
  UploadItem,
  UppyModel,
} from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable, toJS } from 'mobx';
import { isEmpty } from 'radash';

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

@injectable()
export class AgentChatInputModel {
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

  @observable isMessage = false;

  @computed get isContextItemsEmpty() {
    return this.edix.addedContextItems.length === 0;
  }

  /**
   * @description chat input message 形态
   */
  setAsMessage(chatInputDoc: ChatInputDoc) {
    this.isMessage = true;
    // TODO 还有 context
    this.edix.setChatInputDoc(chatInputDoc);
    this.edix.setEdixReadonly(true);
  }

  enableInputAsMessage() {
    this.isMessage = false;
    this.edix.setEdixReadonly(false);
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
      await this.edix.clearEdix();
      this.edix.addedContextMap.clear();
      this.uppy.clear();
    }
  }

  removeImagePreview(id: string) {
    this.uppy.removeFile(id);
  }
}
