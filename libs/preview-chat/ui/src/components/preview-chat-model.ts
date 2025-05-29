import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { ChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import { OWN_MESSAGE_TYPE } from '@myshell-run/preview-chat-message-item-plugins';
import { createId } from '@paralleldrive/cuid2';

@injectable()
export class PreviewChatModel implements ChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }
  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }
  async *clear() {
    yield;
  }
  async *sendText(text: string) {
    const msgId = createId();
    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });
    yield;
  }
  *removeImagePreview(id: string) {
    yield;
  }
}
