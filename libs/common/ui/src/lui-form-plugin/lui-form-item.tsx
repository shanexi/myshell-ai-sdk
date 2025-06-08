import { useInjection } from 'inversify-react';
import { useId } from 'react';
import { LuiFormItemJsonSchema } from '@myshell-run/common-def';
import { LuiFormItemSvc } from './lui-form-item.svc';

export const LuiFormItem: React.FC<
  LuiFormItemJsonSchema & { variant: string }
> = (props) => {
  // https://hetdesai03.medium.com/a-complete-guide-to-useid-hook-in-react-18-22119ecfd87f
  // The main purpose of the useId() hook is to generate unique IDs for HTML form elements.
  const id = useId();
  const { variant } = props;
  const svc = useInjection(LuiFormItemSvc);
  const { item, model } = svc.getItem(variant, id);
  return item.render(props, model);
};
