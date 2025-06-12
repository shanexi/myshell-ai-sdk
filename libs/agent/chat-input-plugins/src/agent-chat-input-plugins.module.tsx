// import { ChatInputPlugin } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputAdvancedInputPlugin } from './components/chat-input-advanced-input-plugin';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { ChatInputUploadPlugin } from './components/chat-input-upload-plugin';
import { ChatInputModel } from './components/chat-input.model';
import { ChatInputPlugin } from './components/chat-input-plugin-slot';

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
    // ChatInputTextareaPlugin,
    ChatInputAdvancedInputPlugin,
    ChatInputActionPlugin,
  ]);
}
