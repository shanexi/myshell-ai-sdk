import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from './message-item';
import { container } from './stories.utils';

const meta: Meta<typeof MessageItem> = {
  component: MessageItem,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Own: StoryObj<typeof MessageItem> = {
  args: {
    data: {
      key: '1',
      text: 'Hello, how are you?',
      user: 'me',
    },
  },
};

export const Reply: StoryObj<typeof MessageItem> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14522-121105&m=dev',
    },
  },
  args: {
    data: {
      key: '2',
      text: 'I am fine, thank you!',
      user: 'other',
    },
  },
};
