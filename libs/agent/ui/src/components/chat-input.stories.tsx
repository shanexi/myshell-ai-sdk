import { messageItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { commonUIModule, InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';
import { ChatInput } from './chat-input';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(agentUIModule);
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
      url: 'https://www.figma.com/design/YHfVjepmkzvSL4Yf1nD9KS/Shell-Agent?node-id=1408-77922&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
