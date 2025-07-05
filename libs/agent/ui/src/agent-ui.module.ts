import { AgentChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import { ContainerModule, interfaces } from 'inversify';
import { AgentChatModel } from './components/agent-chat.model';
import { AgentChatHelper } from './components/agent-chat.helper';
import { addMessagePluginFactory } from '@myshell-run/common-ui';
import { ChatInput } from './components/chat-input';
import { OWN_MESSAGE_TYPE } from '@myshell-run/agent-message-plugins';

export const agentUIModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bindAgentUI(bind, unbind, isBound, rebind);
  },
);

export function bindAgentUI(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  bind(AgentChatHelper).toSelf().inSingletonScope();
  bind(AgentChatModel).toSelf().inSingletonScope();
  bind(AgentChatInputHandlers).toDynamicValue((ctx) =>
    ctx.container.get(AgentChatModel),
  );
  // bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

  const addMessagePlugin = addMessagePluginFactory(
    bind,
    unbind,
    isBound,
    rebind,
  );
  addMessagePlugin(OWN_MESSAGE_TYPE, ChatInput);
}
