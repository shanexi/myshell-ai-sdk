import { ContainerModule } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import { UploadEndpoint } from '@myshell-run/common-def';

export const agentUIModule = new ContainerModule((bind) => {
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
});
