import { injectable, multiInject } from 'inversify';
import { MessageItem } from '@myshell-run/biz-def';
@injectable()
export class MessageItemSvc {
  constructor(@multiInject(MessageItem) private items: MessageItem[]) {}

  getItem(type: string) {
    const item = this.items.find((item) => item.type === type);
    if (!item) {
      throw new Error(`Message item with type ${type} not found`);
    }
    return item;
  }
}
