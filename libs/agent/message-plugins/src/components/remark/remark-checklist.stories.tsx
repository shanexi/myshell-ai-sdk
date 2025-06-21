import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { ChecklistStory } from './remark-msg-story-components';

const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof ChecklistStory> = {
  component: ChecklistStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Checklist: StoryObj<typeof ChecklistStory> = {
  parameters: {},
  args: {},
};
