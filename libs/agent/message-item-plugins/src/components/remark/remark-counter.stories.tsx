import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../../agent-msg-item-plugins.module';
import { CounterStory } from './remark-msg';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof CounterStory> = {
  component: CounterStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Counter: StoryObj<typeof CounterStory> = {
  parameters: {},
  args: {},
};
