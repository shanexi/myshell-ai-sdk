import { AgentChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import {
  agent_message_schema,
  content_blocks_schema,
  OWN_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  ChatInputDoc,
  ContextItem,
  UploadItem,
} from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { z } from 'zod';
import { hi_msg } from '../../__storybook_data__/backend_message';
import { AgentChatHelper } from '../agent-chat.helper';
import { extractChatMessagesFromHAR } from './har-utilts';
import { isEmpty } from 'radash';

@injectable()
export class ShellAgentChatModel implements AgentChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
    @inject(AgentChatHelper) private helper: AgentChatHelper,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  async *sendChatInputDoc(
    chatInputDoc: ChatInputDoc,
    uploads: UploadItem[],
    context: ContextItem[],
  ) {
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

    this.chatCommon.virtuoso.appendMsg({
      key: msgId,
      text: text, // TODO: 这个 text 没有使用了，因为 args: chatInputDoc
      type: OWN_MESSAGE_TYPE,
      args: chatInputDoc, // 传入 doc 给到 chatInput message
    });

    // // TODO: 对接后端
    // console.log(
    //   'send',
    //   uploads,
    //   context,
    //   f2b_content_blocks(toJS(chatInputDoc)),
    // );

    yield;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Extract messages from HAR file
    const harMessages = extractChatMessagesFromHAR();

    // Use HAR messages if available, otherwise fallback to mock data
    const mockResponses: Array<z.infer<typeof agent_message_schema>> =
      // harMessages;
      [hi_msg] as any[];

    for (const response of mockResponses) {
      if (response.type === 'chat_history_message') {
        response.args.data.forEach((data) => {
          if (data.type === 'chat_message') {
            data.cause = 1; // 特殊处理 历史消息全部替换
            this.helper.handleContentBlock(data);
          } else {
            this.helper.handleTypedMessage(data);
          }
        });
      } else if (response.type === 'chat_message') {
        const res = content_blocks_schema.parse(response);
        this.helper.handleContentBlock(res);
      } else {
        this.helper.handleTypedMessage(response);
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  async *sendText(text: string) {
    const msgId = createId();

    this.chatCommon.virtuoso.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });

    yield;
  }
}
