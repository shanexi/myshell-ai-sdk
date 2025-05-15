import type { Meta, StoryObj } from '@storybook/react';
import { Checkpoint } from './checkpoint-msg';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../agent-msg-item-plugins.module';
import { InversifyProvider } from '@myshell-run/common-ui';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof Checkpoint> = {
  component: Checkpoint,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof Checkpoint> = {
  args: {},
};
