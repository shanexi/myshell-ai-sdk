import { useInjection } from 'inversify-react';

export const AgentChatInputPlugin = Symbol.for('ChatInputPlugin');
export type AgentChatInputPlugin = () => JSX.Element;

export const AgentChatInputPluginSlot = () => {
  const plugins = useInjection<AgentChatInputPlugin[]>(AgentChatInputPlugin);
  return plugins.map((Plugin, index) => {
    return <Plugin key={index} />;
  });
};
