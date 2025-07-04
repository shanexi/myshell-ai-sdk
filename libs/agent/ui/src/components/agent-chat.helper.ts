import {
  agent_message_schema_2,
  content_blocks_schema,
  ContentBlockableFactory,
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import {
  AGENT_CHAT,
  ChatCommonModelFactory,
  StrictMessage,
} from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { processBlockDirectiveNewLine } from './agent-chat.utils';

@injectable()
export class AgentChatHelper {
  constructor(
    @inject(ContentBlockableFactory)
    private blockableFactory: ContentBlockableFactory,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    //
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  /**
   * 处理 chat_message
   * 和 @see handleHistoryContentBlock
   */
  handleContentBlock(chunk: z.infer<typeof content_blocks_schema>) {
    const message_id = String(chunk.message_id);
    if (this.chatCommon.isMsgNoExists(message_id)) {
      const text = this.contentBlockToText(chunk);
      this.chatCommon.virtuosoRef?.current?.data.append([
        {
          key: message_id,
          text,
          type: chunk.source === 'user' ? OWN_MESSAGE_TYPE : REPLY_MESSAGE_TYPE,
        },
      ]);
    } else {
      this.chatCommon.virtuosoRef?.current?.data.map((message) => {
        if (message.key !== message_id) {
          return message;
        }
        const nextText = this.contentBlockToText(chunk, message);
        return {
          ...message,
          text: nextText,
          type: chunk.source === 'user' ? OWN_MESSAGE_TYPE : REPLY_MESSAGE_TYPE,
        };
      }, 'smooth');
    }
  }

  /**
   * 处理第一层 type，即 message plugin
   */
  handleTypedMessage(msg: z.infer<typeof agent_message_schema_2>) {
    const message_id = String(msg.message_id);
    const { type, args } = msg;
    if (this.chatCommon.isMsgNoExists(message_id)) {
      this.chatCommon.virtuosoRef?.current?.data.append([
        {
          key: message_id,
          text: '',
          type,
        },
      ]);
    } else {
      this.chatCommon.virtuosoRef?.current?.data.map((message) => {
        return message.key === message_id
          ? { ...message, args, type }
          : message;
      }, 'smooth');
    }
  }

  /**
   * 处理 chat_message 的 content_blocks -> text
   */
  private contentBlockToText(
    chunk: z.infer<typeof content_blocks_schema>,
    message?: StrictMessage,
  ) {
    const message_id = String(chunk.message_id);
    const textList = chunk.args.content_blocks.map((b) => {
      return this.blockableFactory(b.type, message_id).transform(
        b,
        chunk,
        message,
      );
    });
    const text = processBlockDirectiveNewLine(textList);
    return text;
  }
}
