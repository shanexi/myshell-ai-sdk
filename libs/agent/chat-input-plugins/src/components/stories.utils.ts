import { ChatInputDoc, commonUIModule } from '@myshell-run/common-ui';
import { AgentChatInputHandlers } from './agent-chat-input.model';
import { Container } from 'inversify';
import { UploadEndpoint } from '@myshell-run/common-def';
import { agentChatInputPluginsModule } from '../agent-chat-input-plugins.module';

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
}

export const container = new Container();
container
  .bind<AgentChatInputHandlers>(AgentChatInputHandlers)
  .to(SomeChatInputHandler);

container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');
container.load(commonUIModule);
container.load(agentChatInputPluginsModule);
