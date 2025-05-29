import { addMessagePluginFactory } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
import { OwnMessage } from './components/own-msg';
import { ReplyMsg } from './components/reply-msg';
import { AgentMessage } from './types';

export const OWN_MESSAGE_TYPE = 'own';
export const REPLY_MESSAGE_TYPE = 'reply';

function registerMesssageItem(bind: interfaces.Bind) {
  const addMessagePlugin = addMessagePluginFactory<AgentMessage>(bind);
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
}

export const agentMsgItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentMsgItemPlugins(bind);
  },
);

export function bindAgentMsgItemPlugins(bind: interfaces.Bind) {
  registerMesssageItem(bind);
}
