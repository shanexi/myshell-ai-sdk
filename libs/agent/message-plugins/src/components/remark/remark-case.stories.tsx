import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../../agent-msg-item-plugins.module';
import { RemarkStory } from './remark-msg-story-components';
import case1 from './case1.md';
import case2 from './case2.md';
import case20 from './case2-0.md';
import case3 from './case3.md';
import case4 from './case4.md';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof RemarkStory> = {
  component: RemarkStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Case1: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: case1,
  },
};

export const Case2: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: case2,
  },
};

export const Case20: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: case20,
  },
};

export const Case3: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: case3,
  },
};

export const Case4: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: case4,
  },
};
