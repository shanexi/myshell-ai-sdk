import {
  ChatInputTextareaPluginHandler,
  ChatInputActionPluginHandler,
} from '@myshell-run/agent-chat-input-plugins';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { ChatCommonModel } from '@myshell-run/common-ui';

@injectable()
export class ShellAgentChatModel
  implements ChatInputTextareaPluginHandler, ChatInputActionPluginHandler
{
  constructor(@inject(ChatCommonModel) private chatCommon: ChatCommonModel) {
    makeObservable(this);
  }
  async *clear(): AsyncGenerator {
    console.log('clear');
    yield;
  }

  async *sendText(text: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      user: 'me',
    });

    const sec = 3;

    const msg = `::x-polling{#${replyMsgId} timeLeft=${sec}}`;
    this.chatCommon.appendMsg({
      key: replyMsgId,
      text: msg,
      user: 'other',
    });

    setTimeout(
      () => {
        this.chatCommon.updateMsg({
          key: replyMsgId,
          text: msg + '\n' + `::x-polling{#${replyMsgId} timeLeft=${sec}}`,
          user: 'other',
        });
      },
      (sec + 2) * 1000,
    );

    yield;
  }
}
