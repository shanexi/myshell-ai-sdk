import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { action, makeObservable, runInAction } from 'mobx';
import { createId } from '@paralleldrive/cuid2';
import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';

@injectable()
export class AgentChatModel {
  constructor(@inject(ChatCommonModel) public chatCommon: ChatCommonModel) {
    makeObservable(this);
  }

  get virtuosoRef() {
    return this.chatCommon.virtuosoRef;
  }

  @action.bound
  sendText() {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: this.chatCommon.inputText,
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
        prompt: this.chatCommon.inputText,
      }),
      signal: abortController.signal,
      openWhenHidden: true,
      onerror: (err) => {
        //
      },
      onmessage: (ev: EventSourceMessage) => {
        if (this.chatCommon.isMsgNoExists(replyMsgId)) {
          this.chatCommon.appendMsg({
            key: replyMsgId,
            text: ev.data,
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
      this.chatCommon.setInputText('');
    });
  }
}
