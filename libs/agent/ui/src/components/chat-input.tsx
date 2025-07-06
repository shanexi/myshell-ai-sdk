import {
  AgentChatInputPluginProps,
  AgentChatInputPluginSlot,
} from '@myshell-run/agent-chat-input-plugins';
import { cn } from '@myshell-run/common-ui';

export const ChatInput: React.FC<AgentChatInputPluginProps> = (props) => {
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
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
