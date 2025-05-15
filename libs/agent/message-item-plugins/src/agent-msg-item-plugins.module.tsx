import { Message, MessageItem } from '@myshell-run/common-def';
import { setup } from '@myshell-run/common-ui';
import { ContainerModule, interfaces } from 'inversify';
import {
  CheckList as Checklist,
  ChecklistCode,
  CheckListItem as ChecklistItem,
} from './components/checklist-msg';
import { ChecklistItemModel } from './components/checklist-msg.model';
import { OwnMessage } from './components/own-msg';
import { ReplyMsg } from './components/reply-msg';

export const OWN_MESSAGE_TYPE = 'own';
export const REPLY_MESSAGE_TYPE = 'reply';
export const REPLY_MESSAGE_EXECUTING_TYPE = 'reply:executing';
export const AGENT_MESSAGE_LIST_DIRECTORY_TYPE = 'agent:list-directory';

function legacy(bind: interfaces.Bind) {
  function addMessagePlugin(
    type: string,
    Component: React.ComponentType<Message>,
  ) {
    bind<MessageItem>(MessageItem).toConstantValue({
      type,
      render: (data) => {
        const { key, ...rest } = data;
        return <Component key={key} {...rest} />;
      },
    });
  }

  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
}

export const agentMsgItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    legacy(bind);
    const register = setup(bind);
    // 涉及到了 JSX，可能会影响 unit test perf
    register('x-checklist', Checklist);
    register('x-checklist-item', ChecklistItem, ChecklistItemModel);
    register('x-checklist-code', ChecklistCode);
  },
);
