/*
import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { RemarkDefaultMessage } from './remark-default-message';

const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof RemarkDefaultMessage> = {
  component: RemarkDefaultMessage,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Primary: StoryObj<typeof RemarkDefaultMessage> = {
  parameters: {},
  args: {},
};
*/
