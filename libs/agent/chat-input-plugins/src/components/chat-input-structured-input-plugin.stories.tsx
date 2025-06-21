import { UploadEndpoint } from '@myshell-run/common-def';
import { ChatInputDoc, commonUIModule } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { agentChatInputPluginsModule } from '../agent-chat-input-plugins.module';
import { ChatInputStructuredInputPlugin } from './chat-input-structured-input-plugin';
import { AgentChatInputHandlers } from './agent-chat-input.model';

class SomeChatInputHandler implements AgentChatInputHandlers {
  async *sendChatInputDoc(chatInputDoc: ChatInputDoc) {
    yield;
  }
  *removeImagePreview(id: string) {
    yield;
  }
  async *sendText(text: string) {
    console.log('sendText', text);
    yield;
  }
  async *clear() {
    console.log('clear');
    yield;
  }
}

const container = new Container();
container
  .bind<AgentChatInputHandlers>(AgentChatInputHandlers)
  .to(SomeChatInputHandler);

container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');
container.load(commonUIModule);
container.load(agentChatInputPluginsModule);

const meta: Meta<typeof ChatInputStructuredInputPlugin> = {
  component: ChatInputStructuredInputPlugin,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatInputStructuredInputPlugin> = {
  args: {},
};
