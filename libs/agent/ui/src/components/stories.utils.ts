import { agentChatInputPluginsModule } from '@myshell-run/agent-chat-input-plugins';
import { agentMsgItemPluginsModule } from '@myshell-run/agent-message-item-plugins';
import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';

export const container = new Container();
container.load(agentUIModule);
container.load(commonUIModule);
container.load(agentMsgItemPluginsModule);
container.load(agentChatInputPluginsModule);
