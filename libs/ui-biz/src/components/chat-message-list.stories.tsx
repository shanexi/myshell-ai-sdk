import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './chat-message-list';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '../ui-biz.module';
import { randomMessage } from './chat-demo';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

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
