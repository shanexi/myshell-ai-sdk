import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { ChatInputPlugin } from './components/chat-input-plugin-slot';
import { ChatInputStructuredInputPlugin } from './components/chat-input-structured-input-plugin';
import { ChatInputUploadPlugin } from './components/chat-input-upload-plugin';
import { ChatInputModel } from './components/chat-input.model';

export const agentChatInputPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentChatInputPlugins(bind);
  },
);

export function bindAgentChatInputPlugins(bind: interfaces.Bind) {
  bind(ChatInputModel).toSelf().inSingletonScope();
  bind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
    ChatInputContextPlugin,
    ChatInputUploadPlugin,
    ChatInputStructuredInputPlugin,
    ChatInputActionPlugin,
  ]);
}
