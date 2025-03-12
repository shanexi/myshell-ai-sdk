import { ContainerModule } from 'inversify';
import { MessageItemSvc } from './components/message-item.svc';

export const uiModule = new ContainerModule((bind) => {
  bind(MessageItemSvc).toSelf().inSingletonScope();
});
