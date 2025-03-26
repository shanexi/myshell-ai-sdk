import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '@myshell-run/ui-biz';
import { Container } from 'inversify';
import { CounterModel } from './counter.model';

export const clientContainer = new Container();
clientContainer.load(messageItemPluginsModule);
clientContainer.load(uiBizModule);

clientContainer.bind(CounterModel).toSelf().inSingletonScope();
