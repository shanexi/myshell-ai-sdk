import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';

@injectable()
export class XButtonModel implements Remarkable {
  @observable display_text = '';

  onUpdate(props: Properties) {
    this.display_text = props.display_text as string;
  }

  constructor() {
    makeObservable(this);
  }
}
