import { injectable, multiInject } from 'inversify';
import { MessageItem } from '@myshell-run/def';
@injectable()
export class MessageItemSvc {
  constructor(@multiInject(MessageItem) private items: MessageItem[]) {}
}
