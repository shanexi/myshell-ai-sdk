import {
  AgentChatInputPluginSlot,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import {
  ChatInputDoc,
  cn,
  content_block_schema,
  context_schema,
} from '@myshell-run/common-ui';
import { useEffect } from 'react';
import { z } from 'zod';
import { contentBlockToChatInputDoc } from './agent-chat.utils';

const content_blocks_schema = z.array(content_block_schema);
export const ChatInput: React.FC<{
  /**
   * @description chat Input 支持在 message 展示，可以有一个 messageId
   */
  messageId?: string;
  /**
   * @description 借用了 strict_message_schema 的 args 存放 doc
   */
  args?: {
    context: z.infer<typeof context_schema>;
    content_blocks: z.infer<typeof content_blocks_schema>;
  };
}> = (props) => {
  const chatInput = useAgentChatInputModel(props.messageId);
  useEffect(() => {
    if (props.messageId && props.args) {
      chatInput.setupMessage(
        contentBlockToChatInputDoc(props.args.content_blocks),
        props.args.context,
      );
    }
  }, [props.messageId]);

  return (
    <div
      className={cn('px-spacing-xl-v2 py-spacing-md-v2')}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        chatInput.enableInput(props.messageId);
      }}
    >
      <div
        className={cn(
          'rounded-lg-v2',
          // 'border border-CCr-input-border-v2',
          'bg-CCr-input-bg_default-v2',
          'py-spacing-sm-v2',
        )}
      >
        <AgentChatInputPluginSlot messageId={props.messageId} />
      </div>
    </div>
  );
};
