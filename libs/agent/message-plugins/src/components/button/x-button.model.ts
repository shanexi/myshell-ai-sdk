import { Remarkable, StrictMessage } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { z } from 'zod';
import { ContentBlockable } from '../remark/content-blockable';
import { parseDirective } from '@myshell-run/common-ui';

export const button_schema = z.object({
  type: z.literal('button'),
  content: z.object({
    action_type: z.enum(['submit']),
    display_text: z.string(),
    target: z.string(),
    parameters: z.object({
      action: z.string(),
    }),
  }),
});

@injectable()
export class XButtonModel implements Remarkable, ContentBlockable {
  @observable display_text = '';

  onUpdate(props: Properties) {
    this.display_text = props.display_text as string;
  }

  transform(block: z.infer<typeof button_schema>) {
    return `:x-${block.type}{display_text='${block.content.display_text}'}`;
  }

  getLastText(message: StrictMessage): string {
    const d = parseDirective(message.text);
    const text = d[0]?.attributes?.display_text;
    if (!text) {
      throw new Error(`invalid directive ${message.text}`);
    }
    return text;
  }

  constructor() {
    makeObservable(this);
  }
}
