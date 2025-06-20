import { randomMessage } from '@myshell-run/common-ui';
import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from '@myshell-run/common-ui';
import { container } from './stories.utils';
import { StrictMessage } from '@myshell-run/common-def';
import {
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-plugins';
import { AgentChatModel } from './agent-chat.model';

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

const initialMessages = [
  randomMessage('me'),
  randomMessage('other'),
  randomMessage('other'),
].map<StrictMessage>((message) => ({
  key: message.key,
  text: message.text,
  type: message.user === 'me' ? OWN_MESSAGE_TYPE : REPLY_MESSAGE_TYPE,
}));

export const Primary: StoryObj<typeof ChatMessageList> = {
  args: {
    chatCommonModel: container.get(AgentChatModel).chatCommon,
    initialMessages,
    style: {
      height: 600,
      display: 'flex',
      flexDirection: 'column',
      // fontSize: '70%',
    },
  },
};
