import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import { ChatInputPlugin, UploadEndpoint } from '@myshell-run/common-def';
import { ChatInputContextPlugin } from './components/chat-input/chat-input-context-plugin';
import { ChatInputUploadPlugin } from './components/chat-input/chat-input-upload-plugin';
import { ChatInputActionPlugin } from './components/chat-input/chat-input-action-plugin';
import { ChatInputTextareaPlugin } from './components/chat-input/chat-input-textarea-plugin';

export const agentUIModule = new ContainerModule((bind) => {
  bindAgentUI(bind);
});

export function bindAgentUI(bind: interfaces.Bind) {
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

  bind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
    ChatInputContextPlugin,
    ChatInputUploadPlugin,
    ChatInputTextareaPlugin,
    ChatInputActionPlugin,
  ]);
}
