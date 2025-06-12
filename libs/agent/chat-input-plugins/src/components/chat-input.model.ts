import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  ChatInputDoc,
  UppyState,
} from '@myshell-run/common-ui';
import { FileKind, fromMime, mimeData } from 'human-filetypes';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';

export const ChatInputHandlers = Symbol('ChatInputHandlers');
export type ContextType = 'file' | 'text' | 'json' | 'todo' | 'message';

export type PreviewItem = UppyState & {
  fileKind: FileKind;
  label?: string;
};

export interface ChatInputHandlers {
  clear(): AsyncGenerator;

  /**
   * @description chat input 字符串， eg.g chat-input-textarea-plugin 和 chat-input-advanced-input-plugin
   */
  sendText(text: string): AsyncGenerator;

  /**
   * @description chat input 结构化数据， eg.g chat-input-structured-input-plugin
   */
  sendChatInputDoc(chatInputDoc: ChatInputDoc): AsyncGenerator;

  removeImagePreview(id: string): Generator;
}

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

  constructor(
    @inject(ChatInputHandlers) private handlers: ChatInputHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  @computed get previewItems() {
    return this.chatCommon.uppyModel.uppyState.map<PreviewItem>(
      ([id, item]) => ({
        ...item,
        fileKind: item.type != null ? fromMime(item.type) : FileKind.Unknown,
        label: item.type && mimeData[item.type]?.label,
      }),
    );
  }

  @computed get isContextItemsEmpty() {
    return this.contextItems.length === 0;
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  get showSendButton() {
    return !isEmpty(this.chatCommon.edixModel.inputText);
  }

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
    if (isEmpty(this.chatCommon.edixModel.chatInputDoc)) {
      return;
    }

    for await (const _ of this.handlers.sendChatInputDoc(
      this.chatCommon.edixModel.chatInputDoc,
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.edixModel.clearEdix();
    }
  }

  async clear() {
    for await (const _ of this.handlers.clear()) {
      //
    }
  }

  removeImagePreview(id: string) {
    // todo: 已经有了 chatCommon 似乎不需要 delegate 给外部 handlers
    for (const _ of this.handlers.removeImagePreview(id)) {
      // 其他操作
    }
  }
}
