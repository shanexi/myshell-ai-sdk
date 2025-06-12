import { ChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';

export const agentUIModule = new ContainerModule((bind) => {
  bindAgentUI(bind);
});

export function bindAgentUI(bind: interfaces.Bind) {
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(ChatInputHandlers).toDynamicValue((ctx) =>
    ctx.container.get(AgentChatModel),
  );
  // bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
}
