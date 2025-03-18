import { action, makeObservable, observable } from 'mobx';

export class CounterModel {
  count = 0;
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }
  increment = () => {
    this.count++;
  };
}
