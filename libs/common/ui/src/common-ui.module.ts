import { ContainerModule, interfaces } from 'inversify';
import { ChatCommonModel } from './components/chat-common.model';
import { MessageItemSvc } from './components/message-item.svc';

export const commonUIModule = new ContainerModule((bind) => {
  bindCommonUI(bind);
});

export function bindCommonUI(bind: interfaces.Bind) {
  // TODO: 先把功能实现，多实例的事情想了其他方法, 功能实现后改造
  // bind(ChatCommonModel).toSelf().inTransientScope();
  bind(ChatCommonModel).toSelf().inSingletonScope();
  bind(MessageItemSvc).toSelf().inSingletonScope();
}
