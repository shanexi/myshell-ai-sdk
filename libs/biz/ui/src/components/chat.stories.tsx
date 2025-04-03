import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { uiBizModule } from '../ui-biz.module';
import { BotInfo } from './bot-info';
import { ChatFoot, ChatRoot } from './chat';
import { ChatInputRoot } from './chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTopMenu, ChatTopRoot } from './chat-top';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

function Chat() {
  return (
    <ChatRoot>
      <ChatTopRoot>
        <ChatTopMenu />
      </ChatTopRoot>
      <ChatMessageList className="flex flex-grow flex-col overflow-auto px-[8px]" />
      <ChatFoot>
        <ChatInputRoot />
        <BotInfo
          bot={{
            id: 1,
            name: 'MyShell',
            avatar: 'https://picsum.photos/200/300',
            isOfficial: true,
          }}
        />
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
