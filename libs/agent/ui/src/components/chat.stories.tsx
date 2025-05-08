import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentUIModule } from '../agent-ui.module';
import { Chat } from './chat';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(agentUIModule);

const meta: Meta<typeof Chat> = {
  component: Chat,
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

export const Primary: StoryObj<typeof Chat> = {
  args: {},
};
