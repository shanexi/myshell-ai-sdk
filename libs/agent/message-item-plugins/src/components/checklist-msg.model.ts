import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export type Status = 'checked' | 'unchecked' | 'pending';

@injectable()
export class ChecklistItemModel implements Remarkable {
  @observable status: Status = 'unchecked';

  onUpdate(props: Properties) {
    this.setStatus(props.status as Status);
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setStatus(status: Status) {
    this.status = status;
  }
}
