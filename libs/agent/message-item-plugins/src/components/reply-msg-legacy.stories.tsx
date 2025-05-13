import type { Meta, StoryObj } from '@storybook/react';
import { ReplyMsgLegacy } from './reply-msg-legacy';

const meta: Meta<typeof ReplyMsgLegacy> = {
  component: ReplyMsgLegacy,
};
export default meta;

export const Reply: StoryObj<typeof ReplyMsgLegacy> = {
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
