import { addMessagePluginFactory, setupMdc } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
import { OwnMessage } from './components/own-msg';
import { ReplyMsg } from './components/reply-msg';
import { PreviewMessage } from './types';
import { MessageItemModel } from './components/message-item.model';

export const OWN_MESSAGE_TYPE = 'preview:own';
export const REPLY_MESSAGE_TYPE = 'preview:reply';

export const previewChatMsgItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bindPreviewChatMsgItemPlugins(bind, unbind, isBound, rebind);
  },
);

export function bindPreviewChatMsgItemPlugins(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  bind(MessageItemModel).toSelf().inSingletonScope();
  // register message by type
  const addMessagePlugin = addMessagePluginFactory(
    bind,
    unbind,
    isBound,
    rebind,
  );
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);

  // registy message by mdc directive
  const register = setupMdc(bind, unbind, isBound, rebind);
}
