import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import { Remarkable } from '@myshell-run/common-def';

@injectable()
export class ExecutingMsgModel implements Remarkable {
  @observable timeLeft = 0;

  onUpdate(props: Properties) {
    this.setTimeLeft(Number(props.timeLeft || 0));
  }

  @computed
  get displayTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setTimeLeft(timeLeft: number) {
    this.timeLeft = timeLeft;
  }

  @action.bound
  decreaseTimeLeft() {
    this.timeLeft = this.timeLeft - 1;
  }
}
