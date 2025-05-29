import { addMessagePluginFactory, setupMdc } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
// import { BarChartDemo, LineChartDemo } from './components/chart-demo';
import {
  CheckList as Checklist,
  ChecklistCode,
  CheckListItem as ChecklistItem,
} from './components/checklist-msg';
import { ChecklistItemModel } from './components/checklist-msg.model';
import { OwnMessage } from './components/own-msg';
import { ReplyMsg } from './components/reply-msg';
import { PollingMsg } from './components/polling-msg';
import { PollingMsgModel } from './components/polling-msg.model';
import { AgentMessage } from './types';
// import { LineChartDemo } from './components/chart-demo';

export const OWN_MESSAGE_TYPE = 'own';
export const REPLY_MESSAGE_TYPE = 'reply';

function registerMesssageItem(bind: interfaces.Bind) {
  const addMessagePlugin = addMessagePluginFactory<AgentMessage>(bind);
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
}

function registerMdc(bind: interfaces.Bind) {
  const register = setupMdc(bind);
  // 涉及到了 JSX，可能会影响 unit test perf
  register('x-checklist', Checklist);
  register('x-checklist-item', ChecklistItem, ChecklistItemModel);
  register('x-checklist-code', ChecklistCode);
  register('x-polling', PollingMsg, PollingMsgModel);
  // register('x-line-chart', LineChartDemo);
  // register('x-bar-chart', BarChartDemo);
}

export const agentMsgItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentMsgItemPlugins(bind);
  },
);

export function bindAgentMsgItemPlugins(bind: interfaces.Bind) {
  registerMesssageItem(bind);
  registerMdc(bind);
}
