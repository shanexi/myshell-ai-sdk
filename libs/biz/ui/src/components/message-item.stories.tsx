import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from './message-item';
import { commonUIModule } from '@myshell-run/common-ui';
import { Provider as InversifyProvider } from 'inversify-react';
import { Container } from 'inversify';
import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { uiBizModule } from '../ui-biz.module';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);

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

export const Primary: StoryObj<typeof MessageItem> = {
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
