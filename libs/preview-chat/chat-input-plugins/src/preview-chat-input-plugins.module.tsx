// import { ChatInputPlugin } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputAdvancedInputPlugin } from './components/chat-input-advanced-input-plugin';
import { ChatInputModel } from './components/chat-input.model';
import { ChatInputPlugin } from './components/chat-input-plugin-slot';

export const previewChatInputPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindPreviewChatInputPlugins(bind);
  },
);

export function bindPreviewChatInputPlugins(bind: interfaces.Bind) {
  bind(ChatInputModel).toSelf().inSingletonScope();
  bind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
    ChatInputAdvancedInputPlugin,
    ChatInputActionPlugin,
  ]);
}
