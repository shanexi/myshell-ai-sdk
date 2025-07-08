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
import { isEmpty } from 'radash';
import { z } from 'zod';
import {
  ack_msg_2,
  hi_msg,
  loading_msg_1,
} from '../../__storybook_data__/backend_message';
import { AgentChatHelper } from '../agent-chat.helper';
import { extractChatMessagesFromHAR } from './har-utilts';

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
    yield;

    this.helper.sendChatInputDoc(chatInputDoc, uploads, context);
    // // TODO: 对接后端
    // console.log(
    //   'send',
    //   uploads,
    //   context,
    //   f2b_content_blocks(toJS(chatInputDoc)),
    // );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Extract messages from HAR file
    const harMessages = extractChatMessagesFromHAR();

    // Use HAR messages if available, otherwise fallback to mock data
    const mockResponses: Array<z.infer<typeof agent_message_schema>> =
      // harMessages;
      [hi_msg, ack_msg_2] as any[];

    for (const response of mockResponses) {
      if (response.type === 'chat_history_message') {
        const length =
          this.chatCommon.virtuoso.virtuosoRef?.current?.data.get().length;
        if (length) {
          this.chatCommon.virtuoso.virtuosoRef?.current?.data.deleteRange(
            0,
            length - 1,
          );
        }
        response.args.data.forEach((data) => {
          if (data.type === 'chat_message') {
            // data.cause = 1; // 特殊处理 历史消息全部替换
            this.helper.handleContentBlock(data);
          } else {
            this.helper.handleTypedMessage(data);
          }
        });
      } else if (response.type === 'chat_message') {
        const res = content_blocks_schema.parse({
          ...response,
          message_id: new Date().valueOf(),
        });
        this.helper.handleContentBlock(res);
      } else if (response.type === 'chat_message_ack') {
        this.chatCommon.virtuoso.virtuosoRef?.current?.data.map((message) => {
          // 这个逻辑真的有点脆弱
          if (message.message_id == null) {
            message.message_id = response.message_id;
            return message;
          } else {
            return message;
          }
        });
      } else {
        this.helper.handleTypedMessage({
          ...response,
          message_id: new Date().valueOf(),
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
