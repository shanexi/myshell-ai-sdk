import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../../agent-msg-item-plugins.module';
import { ChecklistStory } from './remark-msg-story-components';

const container = new Container();
container.load(agentMsgItemPluginsModule);

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
