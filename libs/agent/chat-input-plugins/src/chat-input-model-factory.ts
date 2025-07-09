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

/**
 * @description 代表 landing chat input
 */
export const AGENT_CHAT_INPUT_LANDING = 'AGENT_CHAT_INPUT_LANDING';

export function useAgentChatInputModel(id?: string) {
  // const context = useContext(InversifyContext);
  // if (!context) {
  //   throw new Error('Provider is not found');
  // }
  const factory = useInjection<AgentChatInputModelFactory>(
    AgentChatInputModelFactory,
  );
  const model = factory(id || NO_MESSAGE_ID_AGENT_CHAT_INPUT);
  return model;
}
