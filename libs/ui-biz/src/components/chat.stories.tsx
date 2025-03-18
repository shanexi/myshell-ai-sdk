import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './chat';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '../ui-biz.module';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

const meta: Meta<typeof Chat> = {
  component: Chat,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

export const Primary: StoryObj<typeof Chat> = {
  args: {},
};
