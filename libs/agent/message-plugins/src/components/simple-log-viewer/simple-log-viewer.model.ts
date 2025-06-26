import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

@injectable()
export class SimpleLogViewerModel implements Remarkable {
  @observable text = '';

  onUpdate(props: Properties) {
    this.setText(props.text as string);
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setText(text: string) {
    this.text = text;
  }
}
