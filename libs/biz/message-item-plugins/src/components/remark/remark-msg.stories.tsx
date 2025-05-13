import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { bizMsgItemPluginsModule } from '../../biz-msg-item-plugins.module';
import { ReplyMsg } from '../reply-msg';
import remarkMsgStory from './remark-msg-story.md';

const container = new Container();
container.load(bizMsgItemPluginsModule);

const meta: Meta<typeof ReplyMsg> = {
  component: ReplyMsg,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Reply: StoryObj<typeof ReplyMsg> = {
  parameters: {},
  args: {
    text: remarkMsgStory,
  },
};

export const Loading: StoryObj<typeof ReplyMsg> = {
  parameters: {},
  args: {
    text: `
::x-loading[AI is generating]
    `,
  },
};
