import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';

@injectable()
export class PreviewChatModel {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }
  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }
}
