import { ChatInputDoc } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';

/**
 * @description ChatInput 可能有 message 形式
 */
export type AgentChatInputPluginProps = {
  /**
   * @description chat Input 支持在 message 展示，可以有一个 messageId
   */
  messageId?: string;
  /**
   * @description 借用了 strict_message_schema 的 args 存放 doc
   */
  args?: ChatInputDoc;
};

export const AgentChatInputPlugin = Symbol.for('ChatInputPlugin');
export type AgentChatInputPlugin = (
  props: AgentChatInputPluginProps,
) => JSX.Element;

export const AgentChatInputPluginSlot: React.FC<AgentChatInputPluginProps> = (
  props,
) => {
  const plugins = useInjection<AgentChatInputPlugin[]>(AgentChatInputPlugin);
  return plugins.map((Plugin, index) => {
    return <Plugin key={index} {...props} />;
  });
};
