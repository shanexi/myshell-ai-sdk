import { Remarkable } from '@myshell-run/common-def';
import { Properties } from 'hastscript';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { z } from 'zod';
import { content_blocks_schema } from '../remark/content-blocks-to-mdc';

export const agent_log_schema = z.object({
  type: z.literal('agent_log'),
  content: z.object({
    text: z.string(),
  }),
});

export const transformAgentLog = (
  block: z.infer<typeof agent_log_schema>,
  chunk: z.infer<typeof content_blocks_schema>,
) =>
  `::x-agent-log{#${chunk.message_id} text="${encodeURIComponent(block.content.text)}"}`;

@injectable()
export class SimpleLogViewerModel implements Remarkable {
  @observable text = '';

  constructor() {
    makeObservable(this);
  }

  onUpdate(props: Properties) {
    this.setText(props.text as string);
  }

  @action.bound
  setText(text: string) {
    this.text = text;
  }
}
