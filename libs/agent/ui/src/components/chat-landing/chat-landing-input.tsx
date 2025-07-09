import {
  ChatInputActionPlugin,
  ChatInputStructuredInputPlugin,
  NO_MESSAGE_ID_AGENT_CHAT_INPUT,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import { cn } from '@myshell-run/common-ui';
import { useEffect } from 'react';

/**
 * 不保留 context
 */
export const ChatLandingInput = () => {
  const chatInput = useAgentChatInputModel(NO_MESSAGE_ID_AGENT_CHAT_INPUT);
  useEffect(() => {
    chatInput.uppy.setup();
  }, []);

  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-md-v2')}>
      <div
        className={cn(
          'rounded-lg-v2',
          // 'border border-CCr-input-border-v2',
          'bg-CCr-input-bg_default-v2',
          'py-spacing-sm-v2',
        )}
      >
        <ChatInputStructuredInputPlugin />
        <ChatInputActionPlugin />
      </div>
    </div>
  );
};
