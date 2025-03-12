import type { Meta, StoryObj } from '@storybook/react';
import { ReplyMessage } from './reply-message';

const meta: Meta<typeof ReplyMessage> = {
  component: ReplyMessage,
};
export default meta;

export const Reply: StoryObj<typeof ReplyMessage> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14522-121105&m=dev',
    },
  },
  args: {
    key: '2',
    text: 'I am fine, thank you!',
    user: 'other',
  },
};
