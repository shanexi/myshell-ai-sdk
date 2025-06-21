import { ChatCommonModelFactory, PREVIEW_CHAT } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  demo_jsonschema,
  demo_uischema,
} from '@myshell-run/common-ui';
import { PreviewChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import {
  MessageItemHandlers,
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/preview-chat-message-plugins';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { LuiFormModel } from './lui-form/lui-form.model';

@injectable()
export class PreviewChatModel
  implements PreviewChatInputHandlers, MessageItemHandlers
{
  jsonschema = demo_jsonschema;
  uischema = demo_uischema;

  /*
点击 button 其实是发送了一个 message
然后加在 json schema ui schema data 等
然后展示 bottom sheet
  */
  @observable isLuiFormOpen = false;

  constructor(
    @inject(LuiFormModel) public luiFormModel: LuiFormModel,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }

  async *click(scheme: string) {
    // TODO 解析 scheme 请求 json schema 等
    this.setLuiFormOpen(true);
    yield;
  }

  async *clear() {
    yield;
  }

  setLuiFormOpen(isOpen: boolean) {
    this.isLuiFormOpen = isOpen;
  }

  async *sendText(text: string) {
    const msgId = createId();
    const replyId = createId();
    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });
    this.chatCommon.appendMsg({
      key: replyId,
      text: text,
      type: REPLY_MESSAGE_TYPE,
    });
    yield;
  }

  *removeImagePreview(id: string) {
    yield;
  }

  /**
   * @deprecated 因为 type='submit' 不需要 explicitly click submit
   * 这里先保留下，因为有可能有场景 explicitly call
   */
  submitLuiForm = async () => {
    await this.luiFormModel.formikModel.isReadyPromise;
    // this.luiFormModel.formikProps?.submitForm();
  };
}
