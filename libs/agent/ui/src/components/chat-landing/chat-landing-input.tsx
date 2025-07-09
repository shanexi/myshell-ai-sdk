import {
  AGENT_CHAT_INPUT_LANDING,
  ChatInputActionVariantPlugin,
  ChatInputStructuredInputVariantPlugin,
  useAgentChatInputModel,
} from '@myshell-run/agent-chat-input-plugins';
import { useEffect } from 'react';
import { ChatInputWrapper } from '../chat-input';

/**
 * 不保留 context
 */
export const ChatLandingInput = () => {
  const chatInput = useAgentChatInputModel(AGENT_CHAT_INPUT_LANDING);
  useEffect(() => {
    chatInput.uppy.setup();
  }, []);

  return (
    <ChatInputWrapper>
      <ChatInputStructuredInputVariantPlugin />
      <ChatInputActionVariantPlugin />
    </ChatInputWrapper>
  );
};
