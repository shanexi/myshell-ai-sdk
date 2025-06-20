import type { Meta, StoryObj } from '@storybook/react';
import { PollingMsg } from './polling-msg';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../agent-msg-item-plugins.module';
import { Provider as InversifyProvider } from 'inversify-react';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof PollingMsg> = {
  component: PollingMsg,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof PollingMsg> = {
  args: {},
};
