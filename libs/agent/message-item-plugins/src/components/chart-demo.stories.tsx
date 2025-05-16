import type { Meta, StoryObj } from '@storybook/react';
import { ChartDemo } from './chart-demo';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../agent-msg-item-plugins.module';
import { InversifyProvider } from '@myshell-run/common-ui';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof ChartDemo> = {
  component: ChartDemo,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChartDemo> = {
  args: {},
};
