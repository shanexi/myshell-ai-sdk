import {
  AGENT_CHAT_INPUT_LANDING,
  ChatInputActionPlugin,
  ChatInputStructuredInputPlugin,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import { cn } from '@myshell-run/common-ui';
import { useEffect } from 'react';

/**
 * 不保留 context
 */
export const ChatLandingInput = () => {
  const chatInput = useAgentChatInputModel(AGENT_CHAT_INPUT_LANDING);
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
        <ChatInputStructuredInputPlugin messageId={AGENT_CHAT_INPUT_LANDING} />
        <ChatInputActionPlugin messageId={AGENT_CHAT_INPUT_LANDING} />
      </div>
    </div>
  );
};
