import { Message, MessageItem, ReplyMessageContent } from '@myshell-run/def';
import { ContainerModule } from 'inversify';
import { ExecutingMessage, ReplyMessage } from './components/reply-message';
import { ExecutingMessageModel } from './components/executing-message-model';

export const REPLY_MESSAGE_TYPE = 'reply';
export const REPLY_MESSAGE_EXECUTING_TYPE = 'reply:executing';

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

    addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMessage);
    addMessagePlugin(REPLY_MESSAGE_EXECUTING_TYPE, ExecutingMessage);
    bind(ExecutingMessageModel).toSelf();
  },
);
