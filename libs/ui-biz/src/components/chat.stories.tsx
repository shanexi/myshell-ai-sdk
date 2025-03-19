import type { Meta, StoryObj } from '@storybook/react';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '../ui-biz.module';
import { ChatFoot, ChatRoot } from './chat';
import { ChatTop } from './chat-top';
import { ChatMessageList } from './chat-message-list';
import { ChatInputRoot } from './chat-input';
import { BotInfo } from './bot-info';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

function Chat() {
  return (
    <ChatRoot>
      <ChatTop />
      <ChatMessageList className="flex flex-grow flex-col overflow-auto px-[8px]" />
      <ChatFoot>
        <ChatInputRoot />
        <BotInfo />
      </ChatFoot>
    </ChatRoot>
  );
}

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
