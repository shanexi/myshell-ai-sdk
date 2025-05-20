import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';

@injectable()
export class ChatInputActionPluginModel {
  constructor() {
    makeObservable(this);
  }
}
