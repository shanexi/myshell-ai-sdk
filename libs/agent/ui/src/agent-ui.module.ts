import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import { UploadEndpoint } from '@myshell-run/common-def';

export const agentUIModule = new ContainerModule((bind) => {
  bindAgentUI(bind);
});

export function bindAgentUI(bind: interfaces.Bind) {
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
}
