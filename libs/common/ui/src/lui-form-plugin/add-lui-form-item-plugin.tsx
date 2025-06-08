import { LuiFormItem } from '@myshell-run/common-def';
import { interfaces } from 'inversify';
import { z } from 'zod';

export function addLuiFormItemPluginFactory(bind: interfaces.Bind) {
  return function addMessagePlugin<S = z.Schema<unknown>, M = unknown>(
    variant: string,
    Component: React.ComponentType<S & { model: M }>,
    schema: z.Schema<S>,
    modelIdentifier?: interfaces.ServiceIdentifier,
  ) {
    const modelMap = new Map<string, M>();
    if (modelIdentifier) {
      bind(modelIdentifier).toSelf().inTransientScope();
      bind(variant).toFactory<M, [string]>((ctx) => (id: string) => {
        if (modelMap.has(id)) {
          return modelMap.get(id) as M;
        }
        const model = ctx.container.get<M>(modelIdentifier);
        modelMap.set(id, model);
        return model;
      });
    } else {
      bind(variant).toConstantValue(() => undefined);
    }
    bind<LuiFormItem<S, M>>(LuiFormItem).toConstantValue({
      variant,
      render: (data, model) => {
        // todo: development 可以这样，但是 production 得 fallback
        const res = schema.safeParse(data);
        if (res.success) {
          return <Component {...res.data} model={model} />;
        } else {
          return (
            <span>
              {JSON.stringify({
                data,
                error: res.error,
              })}
            </span>
          );
        }
      },
    });
  };
}
