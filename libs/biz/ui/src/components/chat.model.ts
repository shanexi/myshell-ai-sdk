import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { DbBot } from '@myshell-run/biz-def';
import { Message, MessageListContext } from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { RefObject } from 'react';

@injectable()
export class ChatModel {
  get virtuosoRef() {
    return this.chatCommon.virtuosoRef;
  }
  bot?: DbBot;

  @computed get inputText() {
    return this.chatCommon.inputText;
  }
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @observable isInputFocus = false;
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @observable isShowUploadArea = false;

  @computed get isDragging() {
    return this.chatCommon.isDragging;
  }
  get uppy() {
    return this.chatCommon.uppy;
  }

  @computed get uppyStateMap() {
    return this.chatCommon.uppyStateMap;
  }

  get maxNumberOfFiles() {
    return this.chatCommon.maxNumberOfFiles;
  }

  get accept() {
    return this.chatCommon.accept;
  }

  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @computed get layers(): Record<string, { sort: number; height: number }> {
    console.warn('layers is deprecated, will throw error in next version');
    return {
      upload: {
        sort: 1,
        height: 0,
      },
      textarea: {
        sort: 2,
        height: 0,
      },
    };
  }
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @computed get isNotInputFocus() {
    return !this.isInputFocus;
  }
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @computed get notHaveInputText() {
    return this.inputText.length < 1;
  }
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @computed get isShowInputMenu() {
    return this.isNotInputFocus && this.notHaveInputText;
  }
  constructor(@inject(ChatCommonModel) private chatCommon: ChatCommonModel) {
    // @inject(MyAppTrpcClient) public trpc: TRPCClient<AppRouter>,
    makeObservable(this);
  }

  setupUppy(dropTarget: HTMLDivElement) {
    this.chatCommon.setupUppy(dropTarget);
  }

  removeFile(id: string) {
    this.chatCommon.removeFile(id);
  }

  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @action.bound
  setInputFocus(focus: boolean) {
    this.isInputFocus = focus;
  }
  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @action.bound
  toggleUploadArea() {
    this.isShowUploadArea = !this.isShowUploadArea;
  }

  appendMsg(message: Message) {
    this.chatCommon.appendMsg(message);
  }

  isMsgNoExists(key: string) {
    return this.chatCommon.isMsgNoExists(key);
  }

  @action.bound
  sendText() {
    const msgId = createId();
    const replyMsgId = createId();

    this.appendMsg({
      key: msgId,
      text: this.inputText,
      user: 'me',
    });
    // TODO replicache 确保不会漏消息

    const abortController = new AbortController();
    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        method: 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msgId,
        replyMsgId,
        prompt: this.inputText,
        botId: this.bot?.id,
      }),
      signal: abortController.signal,
      openWhenHidden: true,
      onerror: (err) => {
        //
      },
      onmessage: (ev: EventSourceMessage) => {
        if (this.isMsgNoExists(replyMsgId)) {
          this.appendMsg({
            key: replyMsgId,
            text: ev.data,
            user: 'other',
            avatar: this.bot?.avatar,
          });
        } else {
          this.virtuosoRef?.current?.data.map((message) => {
            return message.key === replyMsgId
              ? { ...message, text: message.text + ev.data }
              : message;
          }, 'smooth');
        }
      },
      onopen: async () => {
        //
      },
    });
    runInAction(() => {
      this.chatCommon.setInputText('');
      this.setInputFocus(false);
    });
  }

  @action.bound
  setInputText(text: string) {
    this.chatCommon.setInputText(text);
  }
  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Message, MessageListContext>>,
  ) => {
    this.chatCommon.setVirtuosoRef(ref);
  };

  setBot = (bot?: DbBot) => {
    this.bot = bot;
  };
}
