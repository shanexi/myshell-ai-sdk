import {} from '@myshell-run/common-def';
import { interfaces } from 'inversify';
import { LuiFormItem, LuiFormItemData } from './lui-form-item.svc';

export function addLuiFormItemPluginFactory(bind: interfaces.Bind) {
  return function addMessagePlugin(
    variant: string,
    Component: React.ComponentType<LuiFormItemData>,
  ) {
    bind<LuiFormItem>(LuiFormItem).toConstantValue({
      variant,
      render: (data) => {
        return <Component {...data} />;
      },
    });
  };
}
