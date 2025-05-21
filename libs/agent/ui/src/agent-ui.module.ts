import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import { ChatInputPlugin, UploadEndpoint } from '@myshell-run/common-def';
import { ChatInputContextPlugin } from './components/chat-input/chat-input-context-plugin';
import { ChatInputUploadPlugin } from './components/chat-input/chat-input-upload-plugin';
import { ChatInputActionPlugin } from './components/chat-input/chat-input-action-plugin';
import { ChatInputTextareaPlugin } from './components/chat-input/chat-input-textarea-plugin';
import { ChatInputActionPluginModel } from './components/chat-input/chat-input-action-plugin.model';
import { ChatInputContextPluginModel } from './components/chat-input/chat-input-context-plugin.model';
import {
  ChatInputUploadPluginHandler,
  ChatInputUploadPluginModel,
} from './components/chat-input/chat-input-upload-plugin.model';
import {
  ChatInputTextareaPluginHandler,
  ChatInputTextareaPluginModel,
} from './components/chat-input/chat-input-textarea-plugin.model';

export const agentUIModule = new ContainerModule((bind) => {
  bindAgentUI(bind);
});

export function bindAgentUI(bind: interfaces.Bind) {
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(ChatInputTextareaPluginHandler).toDynamicValue((ctx) =>
    ctx.container.get(AgentChatModel),
  );
  bind(ChatInputUploadPluginHandler).toDynamicValue((ctx) =>
    ctx.container.get(AgentChatModel),
  );
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

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
