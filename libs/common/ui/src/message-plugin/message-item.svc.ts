import { injectable, multiInject } from 'inversify';
import { MessagePlugin } from '@myshell-run/common-def';
@injectable()
export class MessageItemSvc {
  constructor(@multiInject(MessagePlugin) private items: MessagePlugin[]) {}

  getItem(type: string) {
    const item = this.items.find((item) => item.type === type);
    if (!item) {
      throw new Error(`Message item with type ${type} not found`);
    }
    return item;
  }
}
