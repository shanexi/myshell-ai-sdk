import { inject, injectable } from 'inversify';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { AuthModel } from './auth.model';
import { Message, MessageListContext, MyAppTrpcClient } from '@myshell-run/def';
import { type TRPCClient } from '@trpc/client';
import { type AppRouter } from '@myshell-run/simple-services';
import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { RefObject } from 'react';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { createId } from '@paralleldrive/cuid2';
import { randPhrase } from './chat-demo';

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
    this.appendMsg({
      key: createId(),
      text: this.inputText,
      user: 'me',
    });
    const abortController = new AbortController();

    const replyKey = createId();

    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        method: 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: this.inputText,
      }),
      signal: abortController.signal,
      openWhenHidden: true,
      onerror: (err) => {
        //
      },
      onmessage: (ev: EventSourceMessage) => {
        if (this.isMsgNoExists(replyKey)) {
          this.appendMsg({
            key: replyKey,
            text: '',
            user: 'other',
          });
        } else {
          this.virtuosoRef?.current?.data.map((message) => {
            return message.key === replyKey
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
