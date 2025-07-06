import {
  AgentChatInputPluginProps,
  AgentChatInputPluginSlot,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import { ChatInputDoc, cn } from '@myshell-run/common-ui';
import { useEffect } from 'react';

export const ChatInput: React.FC<{
  /**
   * @description chat Input 支持在 message 展示，可以有一个 messageId
   */
  messageId?: string;
  /**
   * @description 借用了 strict_message_schema 的 args 存放 doc
   */
  args?: ChatInputDoc;
}> = (props) => {
  const chatInput = useAgentChatInputModel(props.messageId);
  useEffect(() => {
    if (props.messageId && props.args) {
      chatInput.setAsMessage(props.args);
    }
  }, [props.messageId]);

  return (
    <div
      className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}
      onClick={() => {
        chatInput.enableInputAsMessage();
      }}
    >
      <div
        className={cn(
          'rounded-lg-v2 border border-CCr-input-border-v2',
          'bg-CCr-input-bg_default-v2',
          'p-spacing-xs-v2',
        )}
      >
        <AgentChatInputPluginSlot messageId={props.messageId} />
      </div>
    </div>
  );
};
