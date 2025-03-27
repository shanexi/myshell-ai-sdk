import { ContainerModule } from 'inversify';
import { MessageItemSvc } from './components/message-item.svc';
import { BotListModel } from './components/bot-list.model';
import { ChatModel } from './components/chat.model';
import { AuthModel } from './components/auth.model';

export const uiBizModule = new ContainerModule((bind) => {
  bind(MessageItemSvc).toSelf().inSingletonScope();
  bind(BotListModel).toSelf().inSingletonScope();
  bind(ChatModel).toSelf().inSingletonScope();
  bind(AuthModel).toSelf().inSingletonScope();
});
