import type { Meta, StoryObj } from '@storybook/react';
import { SimpleLogViewer } from './simple-log-viewer';
import {
  msg1,
  msg2,
  msg3,
  msg4,
  msg5,
  msg6,
} from './__storybook_data__/backend_message';

const meta: Meta<typeof SimpleLogViewer> = {
  component: SimpleLogViewer,
};
export default meta;

export const Primary: StoryObj<typeof SimpleLogViewer> = {
  args: {
    text: [
      msg1.args.content_blocks[0].content.text,
      msg2.args.content_blocks[0].content.text,
      msg3.args.content_blocks[0].content.text,
      msg4.args.content_blocks[0].content.text,
      msg5.args.content_blocks[0].content.text,
      msg6.args.content_blocks[0].content.text,
    ].join('\n'),
  },
};
