import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';

export const ChatInputTextareaPluginHandler = Symbol.for(
  'ChatInputTextareaPluginHandler',
);

export interface ChatInputTextareaPluginHandler {
  sendText(text: string): AsyncGenerator;
}

@injectable()
export class ChatInputTextareaPluginModel {
  constructor(
    @inject(ChatInputTextareaPluginHandler)
    private handler: ChatInputTextareaPluginHandler,
    @inject(ChatCommonModel) public chatCommon: ChatCommonModel,
  ) {
    makeObservable(this);
  }

  async sendText() {
    if (isEmpty(this.chatCommon.inputText)) {
      return;
    }

    for await (const _ of this.handler.sendText(this.chatCommon.inputText)) {
      this.chatCommon.setInputText('');
    }
  }
}
