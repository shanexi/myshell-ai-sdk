import { LuiFormItemData } from '@myshell-run/common-def';
import { useInjection } from 'inversify-react';
import { LuiFormItemSvc } from './lui-form-item.svc';

export const LuiFormItem: React.FC<LuiFormItemData> = (props) => {
  const { variant } = props;
  const svc = useInjection(LuiFormItemSvc);
  const item = svc.getItem(variant);
  return item.render(props);
};
