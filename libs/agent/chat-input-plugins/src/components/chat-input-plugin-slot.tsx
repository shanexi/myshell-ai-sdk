import { useInjection } from 'inversify-react';

export const ChatInputPlugin = Symbol('ChatInputPlugin');
export type ChatInputPlugin = () => JSX.Element;

export const ChatInputPluginSlot = () => {
  const plugins = useInjection<ChatInputPlugin[]>(ChatInputPlugin);
  return plugins.map((Plugin, index) => {
    return <Plugin key={index} />;
  });
};
