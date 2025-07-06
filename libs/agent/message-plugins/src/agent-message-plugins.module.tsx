import { addMessagePluginFactory } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
import { XButton } from './components/button/x-button';
import { XButtonModel } from './components/button/x-button.model';
import {
  CheckList,
  ChecklistCode,
  CheckListItem,
} from './components/checklist/checklist-msg';
import { ChecklistItemModel } from './components/checklist/checklist-msg.model';
import { ERROR_MESSAGE_TYPE, ErrorMessage } from './components/error/error-msg';
import { Loading, LOADING_MESSAGE_TYPE } from './components/loading/loading';
import { PollingMsg } from './components/polling/polling-msg';
import { PollingMsgModel } from './components/polling/polling-msg.model';
import {
  Progress,
  PROGRESS_MESSAGE_TYPE,
} from './components/progress/progress';
import { setUpMdcContentBlock } from './components/remark/content-blockable-manager';
import { ReplyMsg } from './components/reply/reply-msg';
import { Think } from './components/think/think';
import { ThinkModel } from './components/think/think.model';
import { REPLY_MESSAGE_TYPE } from './types';

function registerMesssage(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  const addMessagePlugin = addMessagePluginFactory(
    bind,
    unbind,
    isBound,
    rebind,
  );
  // agent-ui module 重新注册了
  // addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
  addMessagePlugin(ERROR_MESSAGE_TYPE, ErrorMessage);
  addMessagePlugin(PROGRESS_MESSAGE_TYPE, Progress);
  addMessagePlugin(LOADING_MESSAGE_TYPE, Loading);
}

function registerMdc(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  const { registerMdc, registerMdcContentBlock } = setUpMdcContentBlock(
    bind,
    unbind,
    isBound,
    rebind,
  );
  // 涉及到了 JSX，可能会影响 unit test perf
  registerMdc('x-checklist', CheckList);
  registerMdc('x-checklist-item', CheckListItem, ChecklistItemModel);
  registerMdc('x-checklist-code', ChecklistCode);
  registerMdc('x-polling', PollingMsg, PollingMsgModel);
  registerMdcContentBlock('x-button', XButton, XButtonModel);
  registerMdcContentBlock('x-think', Think, ThinkModel);
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
