import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';

@injectable()
export class ExecutingMessageModel {
  @observable timeLeft = 80;

  constructor() {
    makeObservable(this);
  }
}
