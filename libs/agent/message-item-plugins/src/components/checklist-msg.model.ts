import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable, runInAction } from 'mobx';

export type Status = 'checked' | 'unchecked' | 'pending';

@injectable()
export class ChecklistItemModel implements Remarkable {
  @observable status: Status = 'unchecked';
  @observable title = '';
  @observable hidden = true;

  onUpdate(props: Properties) {
    runInAction(() => {
      this.setStatus(props.status as Status);
      this.setTitle(props.title as string);
    });
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setStatus(status: Status) {
    if (status == null) return;
    this.hidden = false;
    this.status = status;
  }

  @action.bound
  setTitle(title: string) {
    if (title == null) return;
    this.hidden = false;
    this.title = title;
  }
}
