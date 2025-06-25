import {
  agentChatInputPluginsModule,
  ChatInputActionPlugin,
  ChatInputContextPlugin,
  AgentChatInputHandlers,
  AgentChatInputPlugin,
  ChatInputStructuredInputPlugin,
  ChatInputUploadPlugin,
} from '@myshell-run/agent-chat-input-plugins';
import { agentMessagePluginsModule } from '@myshell-run/agent-message-plugins';
import { commonUIModule } from '@myshell-run/common-ui';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import { Container, ContainerModule, interfaces } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { agentUIModule } from '../../agent-ui.module';
import { ShellAgentChat } from './shellagent-chat';
import { ShellAgentChatModel } from './shellagent-chat.model';
import { UploadEndpoint } from '@myshell-run/common-def';
import { previewChatUIModule } from '@myshell-run/preview-chat-ui';
import { previewChatMsgItemPluginsModule } from '@myshell-run/preview-chat-message-plugins';
import { previewChatInputPluginsModule } from '@myshell-run/preview-chat-input-plugins';

const storyModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
    bind(ShellAgentChatModel).toSelf().inSingletonScope();
    rebind(AgentChatInputHandlers).to(ShellAgentChatModel).inSingletonScope();
    rebind<AgentChatInputPlugin[]>(AgentChatInputPlugin).toConstantValue([
      ChatInputContextPlugin,
      ChatInputUploadPlugin,
      ChatInputStructuredInputPlugin,
      ChatInputActionPlugin,
    ]);
  },
);

const container = new Container();
container.load(agentUIModule);
container.load(commonUIModule);
container.load(agentMessagePluginsModule);
container.load(agentChatInputPluginsModule);
container.load(previewChatUIModule);
container.load(previewChatMsgItemPluginsModule);
container.load(previewChatInputPluginsModule);
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
