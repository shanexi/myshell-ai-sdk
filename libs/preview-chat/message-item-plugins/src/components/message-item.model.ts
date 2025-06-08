import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';

export const MessageItemHandlers = Symbol.for('MessageItemHandlers');

export interface MessageItemHandlers {
  click(scheme: string): AsyncGenerator;
}

@injectable()
export class MessageItemModel {
  constructor(
    @inject(MessageItemHandlers) private handlers: MessageItemHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }
  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }

  async click(scheme: string) {
    for await (const _ of this.handlers.click(scheme)) {
      //
    }
  }
}
