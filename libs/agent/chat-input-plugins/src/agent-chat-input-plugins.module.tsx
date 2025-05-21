import { ChatInputPlugin } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputActionPluginModel } from './components/chat-input-action-plugin.model';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { ChatInputContextPluginModel } from './components/chat-input-context-plugin.model';
import { ChatInputTextareaPlugin } from './components/chat-input-textarea-plugin';
import { ChatInputTextareaPluginModel } from './components/chat-input-textarea-plugin.model';
import { ChatInputUploadPlugin } from './components/chat-input-upload-plugin';
import { ChatInputUploadPluginModel } from './components/chat-input-upload-plugin.model';

export const agentChatInputPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentChatInputPlugins(bind);
  },
);

export function bindAgentChatInputPlugins(bind: interfaces.Bind) {
  bind(ChatInputActionPluginModel).toSelf().inSingletonScope();
  bind(ChatInputContextPluginModel).toSelf().inSingletonScope();
  bind(ChatInputUploadPluginModel).toSelf().inSingletonScope();
  bind(ChatInputTextareaPluginModel).toSelf().inSingletonScope();
  bind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
    ChatInputContextPlugin,
    ChatInputUploadPlugin,
    ChatInputTextareaPlugin,
    ChatInputActionPlugin,
  ]);
}
