import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { AgentChatInputPlugin } from './components/agent-chat-input-plugin-slot';
import { ChatInputStructuredInputPlugin } from './components/chat-input-structured-input-plugin';
import { ChatInputUploadPlugin } from './components/chat-input-upload-plugin';
import { AgentChatInputModel } from './components/agent-chat-input.model';

export const agentChatInputPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentChatInputPlugins(bind);
  },
);

export function bindAgentChatInputPlugins(bind: interfaces.Bind) {
  bind(AgentChatInputModel).toSelf().inSingletonScope();
  bind<AgentChatInputPlugin[]>(AgentChatInputPlugin).toConstantValue([
    ChatInputContextPlugin,
    ChatInputUploadPlugin,
    ChatInputStructuredInputPlugin,
    ChatInputActionPlugin,
  ]);
}
