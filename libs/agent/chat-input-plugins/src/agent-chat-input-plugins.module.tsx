import { ChatInputPlugin } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { ChatInputTextareaPlugin } from './components/chat-input-textarea-plugin';
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
    ChatInputTextareaPlugin,
    ChatInputActionPlugin,
  ]);
}
