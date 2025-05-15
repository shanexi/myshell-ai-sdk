import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export type Status = 'checked' | 'unchecked' | 'pending';

@injectable()
export class ChecklistItemModel implements Remarkable {
  @observable status: Status = 'unchecked';
  @observable text = '';
  @observable hidden = true;

  onUpdate(props: Properties) {
    this.setStatus(props.status as Status);
    this.setText(props.text as string);
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
  setText(text?: string) {
    if (text == null) return;
    this.hidden = false;
    this.text = text;
  }
}
