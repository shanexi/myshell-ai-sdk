import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { bizMsgItemPluginsModule } from '../../biz-msg-item-plugins.module';
import { ImageStory } from './remark-msg';

const container = new Container();
container.load(bizMsgItemPluginsModule);

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
