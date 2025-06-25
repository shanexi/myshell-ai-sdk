import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { ThinkStory } from './remark-msg-story-components';

const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof ThinkStory> = {
  component: ThinkStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Primary: StoryObj<typeof ThinkStory> = {
  parameters: {},
  args: {},
};
