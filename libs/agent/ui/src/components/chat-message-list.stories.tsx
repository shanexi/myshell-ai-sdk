import { randomMessage } from '@myshell-run/common-ui';
import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './chat-message-list';
import { container } from './stories.utils';

const meta: Meta<typeof ChatMessageList> = {
  component: ChatMessageList,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatMessageList> = {
  args: {
    initialMessages: [
      randomMessage('me'),
      randomMessage('me'),
      randomMessage('me'),
    ],
    style: {
      height: 600,
      display: 'flex',
      flexDirection: 'column',
      // fontSize: '70%',
    },
  },
};
