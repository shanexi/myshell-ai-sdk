import { ChatInputTextareaPluginHandler } from '@myshell-run/agent-chat-input-plugins';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { ChatCommonModel } from '@myshell-run/common-ui';

@injectable()
export class ShellAgentChatModel implements ChatInputTextareaPluginHandler {
  constructor(@inject(ChatCommonModel) private chatCommon: ChatCommonModel) {
    makeObservable(this);
  }
  async *sendText(text: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      user: 'me',
    });

    const sec = 10;

    this.chatCommon.appendMsg({
      key: replyMsgId,
      text: `::x-polling{#${replyMsgId} timeLeft=${sec}}`,
      user: 'other',
    });

    yield;
  }
}
