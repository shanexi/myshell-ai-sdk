import { useInjection } from 'inversify-react';

export const PreviewChatInputPlugin = Symbol.for('PreviewChatInputPlugin');
export type PreviewChatInputPlugin = () => JSX.Element;

export const PreviewChatInputPluginSlot = () => {
  const plugins = useInjection<PreviewChatInputPlugin[]>(
    PreviewChatInputPlugin,
  );
  return plugins.map((Plugin, index) => {
    return <Plugin key={index} />;
  });
};
