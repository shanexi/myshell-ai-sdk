import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { commonUIModule } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { uiBizModule } from '../../ui-biz.module';
import { ChatInput } from './chat-input';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=16756-291206&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
