import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import {
  Message,
  MessageListContext,
  MyAppTrpcClient,
} from '@myshell-run/biz-def';
import { type AppRouter } from '@myshell-run/biz-service';
import { createId } from '@paralleldrive/cuid2';
import { type TRPCClient } from '@trpc/client';
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
import { AuthModel } from './auth.model';

@injectable()
export class ChatModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<Message, MessageListContext>
  >;

  @observable inputText = '';
  @observable isInputFocus = false;
  @computed get isNotInputFocus() {
    return !this.isInputFocus;
  }
  @computed get notHaveInputText() {
    return this.inputText.length < 1;
  }
  @computed get isShowInputMenu() {
    return this.isNotInputFocus && this.notHaveInputText;
  }
  constructor(
    @inject(AuthModel) public auth: AuthModel,
    @inject(MyAppTrpcClient) public trpc: TRPCClient<AppRouter>,
  ) {
    makeObservable(this);
  }

  @action.bound
  setInputFocus(focus: boolean) {
    this.isInputFocus = focus;
  }

  appendMsg(message: Message) {
    this.virtuosoRef?.current?.data.append(
      [message],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'end',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
        };
      },
    );
  }

  isMsgNoExists(key: string) {
    return (
      this.virtuosoRef?.current?.data.find((m) => m.key === key) === undefined
    );
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
            text: '',
            user: 'other',
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
      this.inputText = '';
      this.setInputFocus(false);
    });
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
    // this.trpc.hello.query({
    //   message: text,
    // });
  }
  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Message, MessageListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };
}
