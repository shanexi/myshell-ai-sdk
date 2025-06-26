import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export const unescapeUnicode = (str: string) => {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16)),
  );
};

@injectable()
export class ThinkModel implements Remarkable {
  @observable isOpen = true;
  @observable text = '\ud83d\udcdd';

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

  @action.bound
  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
  @action.bound
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
