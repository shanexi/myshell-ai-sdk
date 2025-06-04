import { json_form_schema } from '@myshell-run/common-def';
import { injectable, multiInject } from 'inversify';
import { z } from 'zod';

export type LuiFormItemData = z.infer<
  typeof json_form_schema
>['properties'][string];

export const LuiFormItem = Symbol('LuiFormItem');

export interface LuiFormItem {
  variant: string;
  render: (data: LuiFormItemData) => JSX.Element;
}

@injectable()
export class LuiFormItemSvc {
  constructor(@multiInject(LuiFormItem) private items: LuiFormItem[]) {}

  getItem(variant: string) {
    const item = this.items.find((item) => item.variant === variant);
    if (!item) {
      throw new Error(`LUI form item with variant ${variant} not found`);
    }
    return item;
  }
}
