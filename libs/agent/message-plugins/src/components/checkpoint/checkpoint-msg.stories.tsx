import type { Meta, StoryObj } from '@storybook/react';
import { Checkpoint } from './checkpoint-msg';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { Provider as InversifyProvider } from 'inversify-react';

const container = new Container();
container.load(agentMessagePluginsModule);

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
