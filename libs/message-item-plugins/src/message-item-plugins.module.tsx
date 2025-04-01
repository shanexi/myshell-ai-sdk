import { Message, MessageItem } from '@myshell-run/biz-def';
import { ContainerModule } from 'inversify';
import { ExecutingMsg } from './components/executing-msg';
import { ExecutingMsgModel } from './components/executing-msg.model';
import { ReplyMsg } from './components/reply-msg';
import { RemarkMsg } from './components/remark/remark-msg';
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
        render: (data) => {
          const { key, ...rest } = data;
          return <Component key={key} {...rest} />;
        },
      });
    }

    addMessagePlugin(REPLY_MESSAGE_TYPE, RemarkMsg);
    addMessagePlugin(REPLY_MESSAGE_EXECUTING_TYPE, ExecutingMsg);
    // addMessagePlugin(AGENT_MESSAGE_LIST_DIRECTORY_TYPE, ListDirectoryMsg);
    bind(ExecutingMsgModel).toSelf().inSingletonScope();
  },
);
