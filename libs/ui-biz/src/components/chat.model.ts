import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { AuthModel } from './auth.model';

@injectable()
export class ChatModel {
  @observable inputText = '';
  constructor(@inject(AuthModel) public auth: AuthModel) {
    makeObservable(this);
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
  }
}
