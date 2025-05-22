import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { agentChatInputPluginsModule } from '../agent-chat-input-plugins.module';
import { ChatInputTextareaPlugin } from './chat-input-textarea-plugin';
import { ChatInputTextareaPluginHandler } from './chat-input-textarea-plugin.model';

class SomeChatInputTextareaPluginHandler
  implements ChatInputTextareaPluginHandler
{
  async *sendText(text: string) {
    console.log('sendText', text);
    yield;
  }
}

const container = new Container();
container
  .bind<ChatInputTextareaPluginHandler>(ChatInputTextareaPluginHandler)
  .to(SomeChatInputTextareaPluginHandler);
container.load(agentChatInputPluginsModule);

const meta: Meta<typeof ChatInputTextareaPlugin> = {
  component: ChatInputTextareaPlugin,
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

export const Primary: StoryObj<typeof ChatInputTextareaPlugin> = {
  args: {},
};
