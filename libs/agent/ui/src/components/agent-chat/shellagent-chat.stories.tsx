import {
  agentChatInputPluginsModule,
  ChatInputActionPlugin,
  ChatInputAdvancedInputPlugin,
  ChatInputHandlers,
} from '@myshell-run/agent-chat-input-plugins';
import { agentMsgItemPluginsModule } from '@myshell-run/agent-message-item-plugins';
import { ChatInputPlugin } from '@myshell-run/common-def';
import { commonUIModule } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container, ContainerModule, interfaces } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { agentUIModule } from '../../agent-ui.module';
import { ShellAgentChat } from './shellagent-chat';
import { ShellAgentChatModel } from './shellagent-chat.model';

const storyModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(ShellAgentChatModel).toSelf().inSingletonScope();
    rebind(ChatInputHandlers).to(ShellAgentChatModel).inSingletonScope();
    rebind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
      ChatInputAdvancedInputPlugin,
      ChatInputActionPlugin,
    ]);
  },
);

const container = new Container();
container.load(agentUIModule);
container.load(commonUIModule);
container.load(agentMsgItemPluginsModule);
container.load(agentChatInputPluginsModule);
container.load(storyModule);

const meta: Meta<typeof ShellAgentChat> = {
  component: ShellAgentChat,
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

export const Primary: StoryObj<typeof ShellAgentChat> = {
  args: {},
};
