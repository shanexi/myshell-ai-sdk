import { ChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonManager, ChatCommonModel } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';

@injectable()
export class ShellAgentChatModel implements ChatInputHandlers {
  private timer: NodeJS.Timer | null = null;
  private readonly seconds = 3;
  private replyMsg = '';

  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  *removeImagePreview(id: string): Generator {
    yield;
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  async *clear(): AsyncGenerator {
    console.log('clear');
    yield;
  }

  startPolling(replyMsgId: string) {
    this.timer = setInterval(async () => {
      if (this.timer) {
        clearInterval(this.timer);
      }
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      this.startPolling(replyMsgId);
      this.chatCommon.updateMsg({
        key: replyMsgId,
        text:
          this.replyMsg +
          '\n' +
          `::x-polling{#${replyMsgId} timeLeft=${this.seconds}}`,
        user: 'other',
      });
    }, this.seconds * 1000);
  }

  async *sendText(text: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      user: 'me',
    });

    this.replyMsg = `::x-polling{#${replyMsgId} timeLeft=${this.seconds}}`;
    this.chatCommon.appendMsg({
      key: replyMsgId,
      text: this.replyMsg,
      user: 'other',
    });
    this.startPolling(replyMsgId);

    yield;
  }
}
