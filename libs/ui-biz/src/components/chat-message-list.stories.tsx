import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './chat-message-list';
import { Provider as InversifyProvider } from 'inversify-react';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiModule } from '../ui.module';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiModule);

const meta: Meta<typeof ChatMessageList> = {
  component: ChatMessageList,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatMessageList> = {
  args: {},
};
