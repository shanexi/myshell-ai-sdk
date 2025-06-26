import { addMessagePluginFactory, setupMdc } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
// import { BarChartDemo, LineChartDemo } from './components/chart-demo';
import {
  CheckList as Checklist,
  ChecklistCode,
  CheckListItem as ChecklistItem,
} from './components/checklist/checklist-msg';
import { ChecklistItemModel } from './components/checklist/checklist-msg.model';
import { OwnMessage } from './components/own/own-msg';
import { PollingMsg } from './components/polling/polling-msg';
import { PollingMsgModel } from './components/polling/polling-msg.model';
import { ReplyMsg } from './components/reply/reply-msg';
import { SimpleLogViewer } from './components/simple-log-viewer/simple-log-viewer';
import { SimpleLogViewerModel } from './components/simple-log-viewer/simple-log-viewer.model';
import { Think } from './components/think/think';
import { ThinkModel } from './components/think/think.model';
import { XButton } from './components/button/x-button';
import { XButtonModel } from './components/button/x-button.model';
import { AgentMessage } from './types';
// import { LineChartDemo } from './components/chart-demo';

export const OWN_MESSAGE_TYPE = 'agent:own';
export const REPLY_MESSAGE_TYPE = 'agent:reply';

function registerMesssage(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  const addMessagePlugin = addMessagePluginFactory<AgentMessage>(
    bind,
    unbind,
    isBound,
    rebind,
  );
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
}

function registerMdc(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  const register = setupMdc(bind, unbind, isBound, rebind);
  // 涉及到了 JSX，可能会影响 unit test perf
  register('x-checklist', Checklist);
  register('x-checklist-item', ChecklistItem, ChecklistItemModel);
  register('x-checklist-code', ChecklistCode);
  register('x-polling', PollingMsg, PollingMsgModel);
  register('x-button', XButton, XButtonModel);
  register('x-agent-log', SimpleLogViewer, SimpleLogViewerModel);
  register('x-think', Think, ThinkModel);
  // register('x-line-chart', LineChartDemo);
  // register('x-bar-chart', BarChartDemo);
}

export const agentMessagePluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindAgentMessagePlugins(bind, unbind, isBound, rebind);
  },
);

export function bindAgentMessagePlugins(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  registerMesssage(bind, unbind, isBound, rebind);
  registerMdc(bind, unbind, isBound, rebind);
}
