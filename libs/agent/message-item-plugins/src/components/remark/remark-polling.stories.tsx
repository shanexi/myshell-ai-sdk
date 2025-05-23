import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../../agent-msg-item-plugins.module';
import { PollingMsgStory } from './remark-msg-story-components';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof PollingMsgStory> = {
  component: PollingMsgStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Checklist: StoryObj<typeof PollingMsgStory> = {
  parameters: {},
  args: {},
};
