import { useInjection } from 'inversify-react';
import {
  NO_MESSAGE_ID_AGENT_CHAT_INPUT,
  useAgentChatInputModel,
} from '../chat-input-model-factory';
import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

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
export type AgentChatInputPlugin = FunctionComponent<AgentChatInputPluginProps>;

// export const AgentChatInputPluginSlot: React.FC<AgentChatInputPluginProps> = ({
export const AgentChatInputPluginSlot = observer<AgentChatInputPluginProps>(
  ({ messageId }) => {
    const model = useAgentChatInputModel(messageId);
    const plugins = useInjection<AgentChatInputPlugin[]>(AgentChatInputPlugin);
    return (
      <>
        <span style={{ display: 'none' }}>
          {messageId} {model.variant}
        </span>
        {plugins.map((Plugin, index) => {
          return (
            <Plugin
              key={`${messageId || NO_MESSAGE_ID_AGENT_CHAT_INPUT}-${Plugin.displayName}`}
              messageId={messageId}
            />
          );
        })}
      </>
    );
  },
);
