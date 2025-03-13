import { Message, MessageItem } from '@myshell-run/def';
import { ContainerModule } from 'inversify';
import { ExecutingMsg } from './components/executing-msg';
import { ExecutingMsgModel } from './components/executing-msg.model';
import { ListDirectoryMsg } from './components/agent/list-directory-msg';
import { ReplyMsg } from './components/reply-msg';

export const REPLY_MESSAGE_TYPE = 'reply';
export const REPLY_MESSAGE_EXECUTING_TYPE = 'reply:executing';
export const AGENT_MESSAGE_LIST_DIRECTORY_TYPE = 'agent:list-directory';

export const messageItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    function addMessagePlugin(
      type: string,
      Component: React.ComponentType<Message>,
    ) {
      bind<MessageItem>(MessageItem).toConstantValue({
        type,
        render: (data) => <Component {...data} />,
      });
    }

    addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
    addMessagePlugin(REPLY_MESSAGE_EXECUTING_TYPE, ExecutingMsg);
    addMessagePlugin(AGENT_MESSAGE_LIST_DIRECTORY_TYPE, ListDirectoryMsg);
    bind(ExecutingMsgModel).toSelf();
  },
);
