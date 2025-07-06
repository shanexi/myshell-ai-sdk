import { useInjection } from 'inversify-react';
import { NO_MESSAGE_ID_AGENT_CHAT_INPUT } from '../chat-input-model-factory';

/**
 * @description ChatInput 可能有 message 形式
 */
export type AgentChatInputPluginProps = {
  /**
   * @description chat Input 支持在 message 展示，可以有一个 messageId
   */
  messageId?: string;
};

export const AgentChatInputPlugin = Symbol.for('ChatInputPlugin');
export type AgentChatInputPlugin = (
  props: AgentChatInputPluginProps,
) => JSX.Element;

export const AgentChatInputPluginSlot: React.FC<AgentChatInputPluginProps> = ({
  messageId,
}) => {
  const plugins = useInjection<AgentChatInputPlugin[]>(AgentChatInputPlugin);
  return plugins.map((Plugin, index) => {
    return (
      <Plugin
        key={`${messageId || NO_MESSAGE_ID_AGENT_CHAT_INPUT}-${Plugin.name}`}
        messageId={messageId}
      />
    );
  });
};
