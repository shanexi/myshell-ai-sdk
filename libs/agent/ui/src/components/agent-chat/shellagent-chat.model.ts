import { ChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import {
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-item-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, ChatInputDoc } from '@myshell-run/common-ui';
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

  async *sendChatInputDoc(chatInputDoc: ChatInputDoc) {
    const msgId = createId();
    const replyMsgId = createId();

    // 先简单变成字符串
    const text = chatInputDoc
      .map((l) =>
        l
          .map((w) => {
            if (w.type === 'text') {
              return w.text;
            }
            if (w.type === 'context') {
              return `\`${w.data.content}\``;
            }
            return ' ';
          })
          .join(''),
      )
      .join('\n');

    this.chatCommon.appendMsg({
      key: msgId,
      text,
      type: OWN_MESSAGE_TYPE,
    });

    this.replyMsg = `::x-polling{#${replyMsgId} timeLeft=${this.seconds}}`;
    this.chatCommon.appendMsg({
      key: replyMsgId,
      text: this.replyMsg,
      type: REPLY_MESSAGE_TYPE,
    });
    this.startPolling(replyMsgId);

    yield;
  }

  *removeImagePreview(id: string) {
    this.chatCommon.uppyModel.removeFile(id);
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
        type: REPLY_MESSAGE_TYPE,
      });
    }, this.seconds * 1000);
  }

  async *sendText(text: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });

    this.replyMsg = `::x-polling{#${replyMsgId} timeLeft=${this.seconds}}`;
    this.chatCommon.appendMsg({
      key: replyMsgId,
      text: this.replyMsg,
      type: REPLY_MESSAGE_TYPE,
    });
    this.startPolling(replyMsgId);

    yield;
  }
}
