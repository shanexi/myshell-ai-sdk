import { InversifyProvider } from '@myshell-run/ui-primitives';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '../../message-item-plugins.module';
import { ImageStory } from './remark-msg';

const container = new Container();
container.load(messageItemPluginsModule);

const meta: Meta<typeof ImageStory> = {
  component: ImageStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Counter: StoryObj<typeof ImageStory> = {
  parameters: {},
  args: {},
};
