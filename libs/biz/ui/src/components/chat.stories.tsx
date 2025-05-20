import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { commonUIModule } from '@myshell-run/common-ui';
import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { uiBizModule } from '../ui-biz.module';
import { BotInfo } from './bot-info';
import { ChatFoot, ChatRoot } from './chat';
import { ChatInputRoot } from './archive/chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTopMenu, ChatTopRoot } from './chat-top';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);

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
            avatar: DEFAULT_AVATAR,
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
