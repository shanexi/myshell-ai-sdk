import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { VirtuosoModel } from './virtuoso.model';

// TODO ChatCommonModel 承担 chat input/chat message 等通信职责，暂时先保留
@injectable()
export class ChatCommonModel {
  public enabledChatInputMessageKey?: string;
  constructor(@inject(VirtuosoModel) public virtuoso: VirtuosoModel) {
    makeObservable(this);
  }
  setEnabledChatInputMessageKey(key: string) {
    this.enabledChatInputMessageKey = key;
  }

  getEnabledChatInputMessageId(): number | undefined {
    if (this.enabledChatInputMessageKey) {
      return this.virtuoso.virtuosoRef?.current?.data.find(
        (message) => message.key === this.enabledChatInputMessageKey,
      )?.message_id;
    }
  }
}
