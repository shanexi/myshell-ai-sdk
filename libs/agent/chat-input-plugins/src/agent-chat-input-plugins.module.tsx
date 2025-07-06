import { ContainerModule, interfaces } from 'inversify';
import { ChatInputActionPlugin } from './components/chat-input-action-plugin';
import { ChatInputContextPlugin } from './components/chat-input-context-plugin';
import { AgentChatInputPlugin } from './components/agent-chat-input-plugin-slot';
import { ChatInputStructuredInputPlugin } from './components/chat-input-structured-input-plugin';
import { ChatInputUploadPlugin } from './components/chat-input-upload-plugin';
import { AgentChatInputModel } from './components/agent-chat-input.model';
import { AgentChatInputModelFactory } from './chat-input-model-factory';

export const agentChatInputPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentChatInputPlugins(bind);
  },
);

// 放全局和放在一个 singleton 的 manager 一样的，简单起见 放全局
const agentChatInputModelMap = new Map<string, AgentChatInputModel>();

export function bindAgentChatInputPlugins(bind: interfaces.Bind) {
  bind(AgentChatInputModelFactory).toFactory<
    AgentChatInputModel,
    Parameters<AgentChatInputModelFactory>
  >((ctx) => (id) => {
    const child = ctx.container.createChild();
    // 这里使用 inSingletonScope/inTransientScope 都没有差异
    // 因为 AgentChatInputModel 只在这几行代码能被调用
    // 默认使用 inSingletonScope，因为 child 是一个新的 container 也会存在多实例
    child.bind(AgentChatInputModel).toSelf().inSingletonScope();
    if (agentChatInputModelMap.has(id)) {
      return agentChatInputModelMap.get(id) as AgentChatInputModel;
    } else {
      const model = child.get(AgentChatInputModel);
      agentChatInputModelMap.set(id, model);
      return model;
    }
  });

  bind<AgentChatInputPlugin[]>(AgentChatInputPlugin).toConstantValue([
    ChatInputContextPlugin,
    ChatInputUploadPlugin,
    ChatInputStructuredInputPlugin,
    ChatInputActionPlugin,
  ]);
}
