import type { Meta, StoryObj } from '@storybook/react';
import { ExecutingMsg } from './executing-msg';
import { InversifyProvider } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../agent-msg-item-plugins.module';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof ExecutingMsg> = {
  component: ExecutingMsg,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Reply: StoryObj<typeof ExecutingMsg> = {
  parameters: {},
  args: {},
};
