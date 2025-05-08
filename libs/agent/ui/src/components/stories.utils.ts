import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';

export const container = new Container();
container.load(agentUIModule);
container.load(commonUIModule);
