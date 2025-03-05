import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from './message-item';

const meta: Meta<typeof MessageItem> = {
  // @ts-expect-error 暂不处理 props 复杂的类型
  component: MessageItem,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof MessageItem> = {
  args: {
    data: {
      key: '1',
      text: 'Hello, how are you?',
      user: 'me',
    },
  },
};

export const Other: StoryObj<typeof MessageItem> = {
  args: {
    data: {
      key: '2',
      text: 'I am fine, thank you!',
      user: 'other',
    },
  },
};
