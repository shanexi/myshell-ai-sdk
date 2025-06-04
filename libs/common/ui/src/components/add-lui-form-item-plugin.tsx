import {
  LuiFormItem,
  LuiFormItemData,
  LuiFormItemVariant,
} from '@myshell-run/common-def';
import { interfaces } from 'inversify';

export function addLuiFormItemPluginFactory(bind: interfaces.Bind) {
  return function addMessagePlugin(
    variant: LuiFormItemVariant,
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
