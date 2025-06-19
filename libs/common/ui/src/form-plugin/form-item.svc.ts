import {
  LuiFormItem,
  LuiFormVariantModelFactory,
} from '@myshell-run/common-def';
import { inject, injectable, multiInject } from 'inversify';

@injectable()
export class FormItemSvc {
  constructor(
    @multiInject(LuiFormItem) private items: LuiFormItem<unknown, unknown>[],
    @inject(LuiFormVariantModelFactory)
    private factory: (variant: string) => (id: string) => unknown,
  ) {
    //
  }

  getItem(variant: string, id: string) {
    const variantFactory = this.factory(variant);
    const model = variantFactory(id);
    const item = this.items.find((item) => item.variant === variant);
    if (!item) {
      throw new Error(`LUI form item with variant ${variant} not found`);
    }
    return {
      item,
      model,
    };
  }
}
