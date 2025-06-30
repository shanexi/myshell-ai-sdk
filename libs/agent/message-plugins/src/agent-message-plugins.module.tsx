import { addMessagePluginFactory } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
import { XButton } from './components/button/x-button';
import {
  transformButton,
  XButtonModel,
} from './components/button/x-button.model';
import { ErrorMessage } from './components/error/error-msg';
import { Loading } from './components/loading/loading';
import { OwnMessage } from './components/own/own-msg';
import { Progress } from './components/progress/progress';
import {
  ContentBlocksToMdcTransformManager,
  setUpMdcTransform,
} from './components/remark/content-block-to-mdc-transform-manager';
import { ReplyMsg } from './components/reply/reply-msg';
import { Think } from './components/think/think';
import { ThinkModel, transformThink } from './components/think/think.model';
import {
  ERROR_MESSAGE_TYPE,
  LOADING_MESSAGE_TYPE,
  OWN_MESSAGE_TYPE,
  PROGRESS_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from './types';
import { PollingMsg } from './components/polling/polling-msg';
import { PollingMsgModel } from './components/polling/polling-msg.model';
import { ChecklistItemModel } from './components/checklist/checklist-msg.model';
import {
  CheckList,
  CheckListItem,
  ChecklistCode,
} from './components/checklist/checklist-msg';

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
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
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
  const { registerMdc, registerMdcTransform } = setUpMdcTransform(
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
  registerMdcTransform('x-button', XButton, transformButton, XButtonModel);
  registerMdcTransform('x-think', Think, transformThink, ThinkModel);
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
  bind(ContentBlocksToMdcTransformManager).toSelf().inSingletonScope();
  registerMesssage(bind, unbind, isBound, rebind);
  registerMdc(bind, unbind, isBound, rebind);
}
