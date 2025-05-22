import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { isEmpty } from 'radash';
import { ChatInputTextareaPluginHandler } from './chat-input-textarea-plugin.model';

@injectable()
export class ChatInputActionPluginModel {
  constructor(
    @inject(ChatInputTextareaPluginHandler)
    private handler: ChatInputTextareaPluginHandler,
    @inject(ChatCommonModel) public chatCommon: ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get showSendButton() {
    return !isEmpty(this.chatCommon.inputText);
  }

  // todo: 重复代码
  async sendText() {
    if (isEmpty(this.chatCommon.inputText)) {
      return;
    }

    for await (const _ of this.handler.sendText(this.chatCommon.inputText)) {
      this.chatCommon.setInputText('');
    }
  }
}
