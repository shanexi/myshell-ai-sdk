import { ContainerModule, interfaces } from 'inversify';
import { ChatCommonModel } from './components/chat-common.model';
import { MessageItemSvc } from './components/message-item.svc';

export const commonUIModule = new ContainerModule((bind) => {
  bindCommonUI(bind);
});

export function bindCommonUI(bind: interfaces.Bind) {
  bind(ChatCommonModel).toSelf().inTransientScope();
  bind(MessageItemSvc).toSelf().inSingletonScope();
}
