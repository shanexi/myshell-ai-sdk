import { ChatCommonModel } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import {
  ChatInputTextareaPluginHandler,
  ChatInputUploadPluginHandler,
} from '@myshell-run/agent-chat-input-plugins';

@injectable()
export class AgentChatModel
  implements ChatInputTextareaPluginHandler, ChatInputUploadPluginHandler
{
  constructor(@inject(ChatCommonModel) public chatCommon: ChatCommonModel) {
    makeObservable(this);
  }

  get virtuosoRef() {
    return this.chatCommon.virtuosoRef;
  }

  *removeImagePreview(id: string) {
    this.chatCommon.removeFile(id);
    yield;
  }

  *sendText(inputText: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: inputText,
      user: 'me',
    });
    // TODO replicache 确保不会漏消息

    // const abortController = new AbortController();
    // fetchEventSource('/api/chat', {
    //   method: 'POST',
    //   headers: {
    //     method: 'POST',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     msgId,
    //     replyMsgId,
    //     prompt: inputText,
    //   }),
    //   signal: abortController.signal,
    //   openWhenHidden: true,
    //   onerror: (err) => {
    //     //
    //   },
    //   onmessage: (ev: EventSourceMessage) => {
    //     if (this.chatCommon.isMsgNoExists(replyMsgId)) {
    //       this.chatCommon.appendMsg({
    //         key: replyMsgId,
    //         text: ev.data,
    //         user: 'other',
    //       });
    //     } else {
    //       this.virtuosoRef?.current?.data.map((message) => {
    //         return message.key === replyMsgId
    //           ? { ...message, text: message.text + ev.data }
    //           : message;
    //       }, 'smooth');
    //     }
    //   },
    //   onopen: async () => {
    //     //
    //   },
    // });
    yield;
  }
}
