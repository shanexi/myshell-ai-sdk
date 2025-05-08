import {
  RegisterMap,
  Remarkable,
  RemarkableFactory,
} from '@myshell-run/common-def';
import { interfaces } from 'inversify';
import { RemarkableManager } from './remark/remark-manager';

export const setup = (bind: interfaces.Bind) => {
  bind(RemarkableManager).toSelf().inSingletonScope();
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
  const registerMap: RegisterMap = new Map();
  bind('RegisterMap').toConstantValue(registerMap);
  function register<T>(
    directiveName: string,
    component: React.ComponentType<T>,
    model?: interfaces.Newable<Remarkable>,
  ) {
    if (model) {
      bind(model).toSelf().inTransientScope();
    }
    registerMap.set(directiveName, [
      component as React.ComponentType<unknown>,
      model,
    ]);
  }
  return register;
};
