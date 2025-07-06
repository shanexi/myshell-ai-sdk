import { useInjection } from 'inversify-react';
import { AgentChatInputModel } from './components/agent-chat-input.model';

export const AgentChatInputModelFactory = Symbol.for(
  'AgentChatInputModelFactory',
);

export type AgentChatInputModelFactory = (id: string) => AgentChatInputModel;

/**
 * @description 代表非消息的 chat input
 */
export const NO_MESSAGE_ID_AGENT_CHAT_INPUT = 'NO_MESSAGE_ID_AGENT_CHAT_INPUT';

export function useAgentChatInputModel(id: string) {
  // const context = useContext(InversifyContext);
  // if (!context) {
  //   throw new Error('Provider is not found');
  // }
  const factory = useInjection<AgentChatInputModelFactory>(
    AgentChatInputModelFactory,
  );
  const model = factory(id);
  return model;
}
