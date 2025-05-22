import { ChatCommonModelFactory } from '@myshell-run/common-def';
import { ContainerModule, interfaces } from 'inversify';
import { ChatCommonModel } from './components/chat-common.model';
import { MessageItemSvc } from './components/message-item.svc';

export const commonUIModule = new ContainerModule((bind) => {
  bindCommonUI(bind);
});

// 放全局和放在一个 sinleton 的 manager 一样的，简单起见 放全局
const chatCommonMap = new Map<symbol, ChatCommonModel>();

export function bindCommonUI(bind: interfaces.Bind) {
  // child 是一种封装，也就是外界不能直接 inject(ChatCommonModel) 必须 inject(ChatCommonModelFactory)
  bind(ChatCommonModelFactory).toFactory<ChatCommonModel, [symbol]>(
    (ctx) => (id) => {
      const child = ctx.container.createChild();
      child.bind(ChatCommonModel).toSelf().inSingletonScope();
      if (chatCommonMap.has(id)) {
        return chatCommonMap.get(id) as ChatCommonModel;
      } else {
        const model = child.get(ChatCommonModel);
        chatCommonMap.set(id, model);
        return model;
      }
    },
  );

  bind(MessageItemSvc).toSelf().inSingletonScope();
}
