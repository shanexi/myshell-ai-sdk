import { Container } from 'inversify';
import { CounterModel } from './counter.model';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { BotListModel, uiBizModule } from '@myshell-run/ui-biz';

export const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

container.bind(CounterModel).toSelf().inSingletonScope();
container.bind(BotListModel).toSelf().inSingletonScope();
