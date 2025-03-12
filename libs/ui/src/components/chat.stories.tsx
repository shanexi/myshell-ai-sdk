import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './chat';
import { Provider as InversifyProvider } from 'inversify-react';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiModule } from '../ui.module';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiModule);

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
