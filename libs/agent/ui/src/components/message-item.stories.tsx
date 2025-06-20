import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { container } from './stories.utils';
import { MessageItem } from '@myshell-run/common-ui';
import {
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';

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
      type: OWN_MESSAGE_TYPE,
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
      type: REPLY_MESSAGE_TYPE,
    },
  },
};
