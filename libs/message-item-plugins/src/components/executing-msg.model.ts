import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';

@injectable()
export class ExecutingMsgModel {
  @observable timeLeft = 80;

  constructor() {
    makeObservable(this);
  }
}
