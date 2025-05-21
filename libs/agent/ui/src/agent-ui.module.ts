import { UploadEndpoint } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import {
  ChatInputTextareaPluginHandler,
  ChatInputUploadPluginHandler,
} from '@myshell-run/agent-chat-input-plugins';

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
}
