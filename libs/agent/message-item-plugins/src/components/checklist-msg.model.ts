import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export type Status = 'checked' | 'unchecked' | 'pending';

@injectable()
export class ChecklistItemModel implements Remarkable {
  @observable status: Status = 'unchecked';
  @observable title = '';

  onUpdate(props: Properties) {
    this.setStatus(props.status as Status);
    this.setTitle(props.title as string);
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setStatus(status: Status) {
    if (status == null) return;
    this.status = status;
  }

  @action.bound
  setTitle(title: string) {
    if (title == null) return;
    this.title = title;
  }
}
