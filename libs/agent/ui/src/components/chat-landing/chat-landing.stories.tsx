import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { container } from '../stories.utils';
import { ChatLanding } from './chat-landing';
import { ContainerModule, interfaces } from 'inversify';
import { ShellAgentChatModel } from '../agent-chat/shellagent-chat.model';
import {
  AGENT_CHAT_INPUT_LANDING,
  AgentChatInputHandlers,
} from '@myshell-run/agent-chat-input-plugins';

const storyModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    if (!isBound(ShellAgentChatModel)) {
      bind(ShellAgentChatModel).toSelf().inSingletonScope();
      rebind(AgentChatInputHandlers).to(ShellAgentChatModel).inSingletonScope();
    }
  },
);

container.load(storyModule);

const model = container.get(ShellAgentChatModel);
model.chatCommon.setEnabledChatInputMessageKey(AGENT_CHAT_INPUT_LANDING);

const meta: Meta<typeof ChatLanding> = {
  component: ChatLanding,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatLanding> = {
  args: {},
};
