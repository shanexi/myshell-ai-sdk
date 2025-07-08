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
import {
  ChatCommonModel,
  ChatInputDoc,
  ContextItem,
  UploadItem,
} from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import {
  contentBlockToChatInputDoc,
  processBlockDirectiveNewLine,
} from './agent-chat.utils';
import { isEmpty } from 'radash';
import { createId } from '@paralleldrive/cuid2';

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
   */
  handleContentBlock(chunk: z.infer<typeof content_blocks_schema>) {
    const key = String(chunk.message_id);
    const args =
      chunk.source === 'user'
        ? {
            context: chunk.args.context,
            chatInputDoc: contentBlockToChatInputDoc(chunk.args.content_blocks),
          }
        : chunk.args;
    if (this.chatCommon.virtuoso.isMsgNoExists(key)) {
      const text = this.contentBlockToText(chunk);
      this.chatCommon.virtuoso.virtuosoRef?.current?.data.append(
        [
          {
            key,
            message_id: chunk.message_id,
            text,
            type:
              chunk.source === 'user' ? OWN_MESSAGE_TYPE : REPLY_MESSAGE_TYPE,
            args,
          },
        ],
        ({ scrollInProgress, atBottom }) => {
          // 如果正在滚动或者不在底部，则不要滚动
          // TODO: 提示新消息
          if (scrollInProgress || !atBottom) return false;

          return {
            index: 'LAST',
            align: 'start-no-overflow', // 和 start 的区别是，如果没有超过 viewport，则不动，超过了，才滚动到顶部
            behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
          };
        },
      );
    } else {
      this.chatCommon.virtuoso.virtuosoRef?.current?.data.map((message) => {
        if (message.key !== key) {
          return message;
        }
        const nextText = this.contentBlockToText(chunk, message);
        return {
          ...message,
          message_id: chunk.message_id,
          text: nextText,
          type: chunk.source === 'user' ? OWN_MESSAGE_TYPE : REPLY_MESSAGE_TYPE,
          args: args,
        };
      }, 'smooth');
    }
  }

  /**
   * 处理第一层 type，即 message plugin
   */
  handleTypedMessage(msg: z.infer<typeof agent_message_schema_2>) {
    const key = String(msg.message_id);
    const { type, args } = msg;
    if (this.chatCommon.virtuoso.isMsgNoExists(key)) {
      this.chatCommon.virtuoso.virtuosoRef?.current?.data.append(
        [
          {
            key: key,
            message_id: msg.message_id,
            text: '',
            type,
            args,
          },
        ],
        ({ scrollInProgress, atBottom }) => {
          if (scrollInProgress || !atBottom) return false;

          return {
            index: 'LAST',
            align: 'start-no-overflow',
            behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
          };
        },
      );
    } else {
      this.chatCommon.virtuoso.virtuosoRef?.current?.data.map((message) => {
        return message.key === key
          ? {
              ...message,
              message_id: msg.message_id,
              args,
              type,
            }
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
    const key = String(chunk.message_id);
    const textList = chunk.args.content_blocks.map((b) => {
      return this.blockableFactory(b.type, key).transform(b, chunk, message);
    });
    const text = processBlockDirectiveNewLine(textList);
    return text;
  }

  sendChatInputDoc(
    chatInputDoc: ChatInputDoc,
    uploads: UploadItem[],
    context: ContextItem[],
  ) {
    const key = createId();
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

    this.chatCommon.virtuoso.virtuosoRef?.current?.data.append(
      [
        {
          key: key,
          text: text, // TODO: 这个 text 没有使用了，因为 args: chatInputDoc
          type: OWN_MESSAGE_TYPE,
          args: {
            chatInputDoc,
            context: [], // TODO: context 处理
          }, // 传入 doc 给到 chatInput message
        },
      ],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'start-no-overflow',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
        };
      },
    );
  }
}
