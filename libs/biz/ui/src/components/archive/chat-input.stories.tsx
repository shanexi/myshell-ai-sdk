import type { Meta, StoryObj } from '@storybook/react';
import { ChatInputRoot, ChatInputMenu, ChatInput } from './chat-input';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { uiBizModule } from '../../ui-biz.module';
import { InversifyProvider } from '@myshell-run/common-ui';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

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
