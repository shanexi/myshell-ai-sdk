import { LuiFormItem } from '@myshell-run/common-def';
import { injectable, multiInject } from 'inversify';
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
