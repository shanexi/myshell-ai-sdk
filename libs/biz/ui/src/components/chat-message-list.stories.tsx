import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './chat-message-list';
import { commonUIModule, InversifyProvider } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { uiBizModule } from '../ui-biz.module';
import { randomMessage } from '@myshell-run/common-ui';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);

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
