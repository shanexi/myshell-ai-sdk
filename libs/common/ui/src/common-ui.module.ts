import { ContainerModule } from 'inversify';
import { ChatCommonModel } from './components/chat-common.model';

export const commonUIModule = new ContainerModule((bind) => {
  bind(ChatCommonModel).toSelf().inTransientScope();
});
