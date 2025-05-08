import { ContainerModule } from 'inversify';
import { MessageItemSvc } from './components/message-item.svc';
import { BotListModel } from './components/bot-list.model';
import { ChatModel } from './components/chat.model';
import { UploadEndpoint } from '@myshell-run/common-def';

export const uiBizModule = new ContainerModule((bind) => {
  bind(MessageItemSvc).toSelf().inSingletonScope();
  bind(BotListModel).toSelf().inSingletonScope();
  bind(ChatModel).toSelf().inSingletonScope();
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
});
