import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';
import { agentMsgItemPluginsModule } from '@myshell-run/agent-message-item-plugins';

export const container = new Container();
container.load(agentUIModule);
container.load(commonUIModule);
container.load(agentMsgItemPluginsModule);
