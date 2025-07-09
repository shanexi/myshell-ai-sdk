import { agentChatInputPluginsModule } from '@myshell-run/agent-chat-input-plugins';
import { agentMessagePluginsModule } from '@myshell-run/agent-message-plugins';
import { UploadEndpoint } from '@myshell-run/common-def';
import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';

export const container = new Container();
container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');
container.load(agentUIModule);
container.load(commonUIModule);
container.load(agentMessagePluginsModule);
container.load(agentChatInputPluginsModule);
