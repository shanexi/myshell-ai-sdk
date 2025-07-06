import {
  AgentChatInputPluginProps,
  AgentChatInputPluginSlot,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import { cn } from '@myshell-run/common-ui';
import { useEffect } from 'react';

export const ChatInput: React.FC<AgentChatInputPluginProps> = (props) => {
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
        <AgentChatInputPluginSlot {...props} />
      </div>
    </div>
  );
};
