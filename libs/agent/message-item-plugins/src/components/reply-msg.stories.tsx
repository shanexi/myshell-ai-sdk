import type { Meta, StoryObj } from '@storybook/react';
import { ReplyMsg } from './reply-msg';

const meta: Meta<typeof ReplyMsg> = {
  component: ReplyMsg,
};
export default meta;

export const Reply: StoryObj<typeof ReplyMsg> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14522-121105&m=dev',
    },
  },
  args: {
    key: '2',
    text: `
The target URL of a request can significantly influence the decision to use a specific proxy server.
`,
    user: 'other',
  },
};
