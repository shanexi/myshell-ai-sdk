import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import { content_blocks_schema } from '../remark/content-blocks-to-mdc';

export const unescapeUnicode = (str: string) => {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16)),
  );
};

export const think_schema = z.object({
  type: z.literal('think'),
  content: z.object({
    text: z.string(),
  }),
});

export const transformThink = (
  block: z.infer<typeof think_schema>,
  chunk: z.infer<typeof content_blocks_schema>,
) =>
  `::x-think{#${chunk.message_id} text="${encodeURIComponent(block.content.text)}"}`;

@injectable()
export class ThinkModel implements Remarkable {
  @observable isOpen = true;
  @observable text = '\ud83d\udcdd';

  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    this.setText(props.text as string);
  }

  @action.bound
  setText(text: string) {
    this.text = decodeURIComponent(text);
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
