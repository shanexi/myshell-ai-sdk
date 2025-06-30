import {
  AgentChatInputHandlers,
  ContextItem,
  UploadItem,
} from '@myshell-run/agent-chat-input-plugins';
import {
  content_blocks_schema,
  ContentBlocksToMdcTransformManager,
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, ChatInputDoc } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable, toJS } from 'mobx';
import { isEmpty } from 'radash';
import {
  hi_msg,
  loading_replace_msg,
  think_msg_1,
  think_msg_2,
  think_msg_case_2a,
  think_msg_case_2b,
  think_msg_case_2c,
} from '../../__storybook_data__/backend_message';
import { f2b_content_blocks } from './shellagent-chat.utils';

@injectable()
export class ShellAgentChatModel implements AgentChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
    @inject(ContentBlocksToMdcTransformManager)
    private transformManager: ContentBlocksToMdcTransformManager,
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

    // TODO: 对接后端
    console.log(
      'send',
      uploads,
      context,
      f2b_content_blocks(toJS(chatInputDoc)),
    );

    yield;

    // mock 一些回复
    // const mockResponses = [msg6, msg7];
    const mockResponses = [
      // hi_msg,
      // loading_msg_1,
      // loading_msg_case_1,
      // loading_replace_msg,
      // think_msg_1,
      // think_msg_2,
      // hi_msg,
      // loading_replace_msg,
      // think_msg_3,
      // progress_msg_1,
      // progress_msg_2,
      // progress_msg_3,
      // think_msg_case_1a,
      // think_msg_case_1,
      think_msg_case_2a,
      think_msg_case_2b,
      think_msg_case_2c,
    ];

    for (const response of mockResponses) {
      // TODO 优化这段多层 if-else
      if (response.type === 'chat_message') {
        const res = content_blocks_schema.parse(response);
        const message_id = String(res.message_id);
        if (this.chatCommon.isMsgNoExists(message_id)) {
          const text = this.transformManager.transform(res);
          this.chatCommon.appendMsg({
            key: message_id,
            text,
            type: REPLY_MESSAGE_TYPE,
          });
        } else {
          // TODO: 需要修改 KEY
          this.chatCommon.virtuosoRef?.current?.data.map((message) => {
            const nextText = this.transformManager.transform(res);
            let text: string;
            if (res.cause) {
              text = nextText;
            } else {
              // TODO 先临时处理下 block directive
              if (nextText.startsWith('::')) {
                text = message.text + '\n' + nextText;
              } else {
                text = message.text + nextText;
              }
            }
            return message.key === message_id
              ? { ...message, text, type: REPLY_MESSAGE_TYPE }
              : message;
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
