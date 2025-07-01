import {
  AgentChatInputHandlers,
  ContextItem,
  UploadItem,
} from '@myshell-run/agent-chat-input-plugins';
import {
  content_blocks_schema,
  ContentBlockableFactory,
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, ChatInputDoc } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable, toJS } from 'mobx';
import { isEmpty } from 'radash';
import * as fs from 'fs';
import * as path from 'path';
import {
  case2_msg1,
  case2_msg2,
  case2_msg3,
  case2_msg4,
  case2_msg5,
  case2_msg6,
  case2_msg7,
  hi_msg,
  think_msg_1,
  think_msg_2,
} from '../../__storybook_data__/backend_message';
import { f2b_content_blocks } from './shellagent-chat.utils';

// Parse HAR data to extract WebSocket messages
function extractChatMessagesFromHAR(): any[] {
  try {
    // const harPath = path.join(__dirname, 'HAR.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const harContent = require('./HAR.json');

    const chatMessages: any[] = [];

    // Process all entries
    harContent.log.entries.forEach((entry: any) => {
      if (entry._webSocketMessages) {
        entry._webSocketMessages.forEach((wsMessage: any) => {
          // Only process 'receive' messages
          // if (wsMessage.type === 'receive') {
          // Parse Socket.IO message format: "42[\"event\", {...}]"
          const match = wsMessage.data.match(/^\d+\["event",(.+)\]$/);
          if (match) {
            try {
              const parsedMessage = JSON.parse(match[1]);
              if (
                parsedMessage &&
                parsedMessage.type &&
                parsedMessage.type.startsWith('chat_')
              ) {
                // if (parsedMessage.id > 20 && parsedMessage.id < 30) {
                chatMessages.push(parsedMessage);
                // }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
          // }
        });
      }
    });

    // // Sort messages by timestamp or message_id
    // chatMessages.sort((a, b) => {
    //   if (a.timestamp && b.timestamp) {
    //     return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    //   }
    //   return (a.message_id || 0) - (b.message_id || 0);
    // });

    return chatMessages;
  } catch (error) {
    console.warn('Failed to extract HAR messages:', error);
    return [];
  }
}

@injectable()
export class ShellAgentChatModel implements AgentChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
    @inject(ContentBlockableFactory)
    private blockableFactory: ContentBlockableFactory,
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

    this.chatCommon.appendMsg({
      key: msgId,
      text,
      type: OWN_MESSAGE_TYPE,
    });

    // // TODO: 对接后端
    // console.log(
    //   'send',
    //   uploads,
    //   context,
    //   f2b_content_blocks(toJS(chatInputDoc)),
    // );

    yield;

    // Extract messages from HAR file
    const harMessages = extractChatMessagesFromHAR();

    // Use HAR messages if available, otherwise fallback to mock data
    const mockResponses =
      harMessages.length > 0
        ? harMessages
        : [case2_msg1, case2_msg2, case2_msg3];

    for (const response of mockResponses) {
      // TODO 优化这段多层 if-else
      console.log('response', response);
      if (response.type === 'chat_message') {
        const res = content_blocks_schema.parse(response);
        const message_id = String(res.message_id);
        if (this.chatCommon.isMsgNoExists(message_id)) {
          const text = res.args.content_blocks
            .map((b) => {
              return this.blockableFactory(b.type, message_id).transform(
                b,
                res,
              );
            })
            .join(' ');
          this.chatCommon.appendMsg({
            key: message_id,
            text,
            type: REPLY_MESSAGE_TYPE,
          });
        } else {
          // TODO: 需要修改 KEY
          this.chatCommon.virtuosoRef?.current?.data.map((message) => {
            if (message.key !== String(res.message_id)) {
              return message;
            }
            const nextText = res.args.content_blocks
              .map((b) => {
                return this.blockableFactory(b.type, message_id).transform(
                  b,
                  res,
                );
              })
              .join(' ');
            let text: string;
            if (res.cause) {
              text = nextText; // 整体替换
            } else {
              // TODO 先临时处理下 block directive
              if (nextText.startsWith('::')) {
                text = message.text + '\n' + nextText;
              } else {
                text = message.text + nextText;
              }
            }
            return { ...message, text, type: REPLY_MESSAGE_TYPE };
          }, 'smooth');
        }
      } else {
        // 处理第一层 type
        const message_id = String(response.message_id);
        if (this.chatCommon.isMsgNoExists(message_id)) {
          this.chatCommon.appendMsg({
            key: message_id,
            text: '',
            type: response.type,
            args: response.args,
          });
        } else {
          this.chatCommon.virtuosoRef?.current?.data.map((message) => {
            return message.key === message_id
              ? { ...message, args: response.args, type: response.type }
              : message;
          }, 'smooth');
        }
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

  addToContext(context: ContextItem) {
    this.chatCommon.addToContext(context);
  }
}
