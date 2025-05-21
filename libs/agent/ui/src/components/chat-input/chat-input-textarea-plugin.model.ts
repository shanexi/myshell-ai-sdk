import { inject, injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';

export const ChatInputTextareaPluginHandler = Symbol.for(
  'ChatInputTextareaPluginHandler',
);

export interface ChatInputTextareaPluginHandler {
  sendText(text: string): Generator;
}

@injectable()
export class ChatInputTextareaPluginModel {
  @observable inputText = '';

  constructor(
    @inject(ChatInputTextareaPluginHandler)
    private handler: ChatInputTextareaPluginHandler,
  ) {
    makeObservable(this);
  }

  setInputText(text: string) {
    this.inputText = text;
  }

  sendText() {
    for (const _ of this.handler.sendText(this.inputText)) {
      this.setInputText('');
    }
  }
}
