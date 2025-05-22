import { ChatInputTextareaPluginHandler } from '@myshell-run/agent-chat-input-plugins';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { AgentChatModel } from '../agent-chat.model';

@injectable()
export class ShellAgentChatModel implements ChatInputTextareaPluginHandler {
  constructor(@inject(AgentChatModel) private agentChat: AgentChatModel) {
    makeObservable(this);
  }
  async *sendText(text: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.agentChat.chatCommon.appendMsg({
      key: msgId,
      text: text,
      user: 'me',
    });

    const sec = 10;

    this.agentChat.chatCommon.appendMsg({
      key: replyMsgId,
      text: `::x-polling{#${replyMsgId} timeLeft=${sec}}`,
      user: 'other',
    });

    yield;
  }
}
