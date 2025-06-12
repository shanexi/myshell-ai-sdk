import {
  RegisterMap,
  Remarkable,
  RemarkableFactory,
} from '@myshell-run/common-def';
import { interfaces } from 'inversify';
import { RemarkableManager } from './remark/remark-manager';

export const setupMdc = (
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) => {
  if (!isBound(RemarkableManager)) {
    bind(RemarkableManager).toSelf().inSingletonScope();
  }
  if (!isBound(RemarkableFactory)) {
    bind<interfaces.Factory<Remarkable>>(RemarkableFactory).toFactory<
      Remarkable,
      Parameters<RemarkableFactory>
    >((context) => {
      return (identifier: interfaces.ServiceIdentifier, id?: string) => {
        const manager = context.container.get(RemarkableManager);
        if (!id) {
          return context.container.get<Remarkable>(identifier);
        }

        const model = manager.get<Remarkable>(id);
        if (model) {
          return model;
        } else {
          const newModel = context.container.get<Remarkable>(identifier);
          manager.set(id, newModel);
          return newModel;
        }
      };
    });
  }
  // 全局唯一，不管调用多少次  setupMdc
  // 放这里而不是放在 global 是为了 HMR（虽然有 HMR API，但是这样简单）
  let registerMap: RegisterMap;
  if (!isBound(RegisterMap)) {
    registerMap = new Map();
    bind(RegisterMap).toConstantValue(registerMap);
  }

  function register<T>(
    directiveName: string,
    component: React.ComponentType<T>,
    model?: interfaces.Newable<Remarkable>,
  ) {
    if (model) {
      bind(model).toSelf().inTransientScope();
    }
    if (registerMap.has(directiveName)) {
      throw new Error(`Directive ${directiveName} already registered`);
    }
    registerMap.set(directiveName, [
      component as React.ComponentType<unknown>,
      model,
    ]);
  }

  return register;
};
