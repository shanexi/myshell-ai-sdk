import {
  ChatInputHandlers,
  UploadItem,
} from '@myshell-run/agent-chat-input-plugins';
import {
  content_blocks_schema,
  content_blocks_to_mdc,
  msg10,
  msg11,
  msg6,
  msg7,
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, ChatInputDoc } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable, toJS } from 'mobx';
import { f2b_content_blocks } from './shellagent-chat.utils';
import { isEmpty } from 'radash';

@injectable()
export class ShellAgentChatModel implements ChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  async *sendChatInputDoc(chatInputDoc: ChatInputDoc, uploads: UploadItem[]) {
    const msgId = createId();
    // 先简单变成字符串
    // TODO 因为上传图片，所以这里得立即处理下
    let text = chatInputDoc
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

    if (!isEmpty(uploads)) {
      text = text + uploads.map((u) => u.name).join(' ');
    }

    this.chatCommon.appendMsg({
      key: msgId,
      text,
      type: OWN_MESSAGE_TYPE,
    });

    // TODO: 对接后端
    console.log('send', uploads, f2b_content_blocks(toJS(chatInputDoc)));

    yield;

    // mock 一些回复
    // const mockResponses = [msg6, msg7];
    const mockResponses = [msg10, msg11];

    for (const response of mockResponses) {
      const res = content_blocks_schema.parse(response);
      const message_id = String(res.message_id);
      if (this.chatCommon.isMsgNoExists(message_id)) {
        this.chatCommon.appendMsg({
          key: message_id,
          text: content_blocks_to_mdc(res),
          type: REPLY_MESSAGE_TYPE,
        });
      } else {
        this.chatCommon.virtuosoRef?.current?.data.map((message) => {
          const nextText = content_blocks_to_mdc(res);
          let text: string;
          if (res.cause) {
            text = nextText;
          } else {
            text = message.text + nextText;
          }
          return message.key === message_id ? { ...message, text } : message;
        }, 'smooth');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  *removeImagePreview(id: string) {
    this.chatCommon.uppyModel.removeFile(id);
    yield;
  }

  async *clear(): AsyncGenerator {
    console.log('clear');
    yield;
  }

  async *sendText(text: string) {
    const msgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });

    yield;
  }
}
