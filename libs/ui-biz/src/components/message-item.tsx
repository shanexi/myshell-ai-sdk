import {
  OwnMessage,
  REPLY_MESSAGE_TYPE,
  ReplyMsg,
} from '@myshell-run/message-item-plugins';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';
import { useInjection } from 'inversify-react';
import { MessageItemSvc } from './message-item.svc';
import { Message, MessageListContext } from '@myshell-run/def';

export const MessageItem: VirtuosoMessageListProps<
  Message,
  MessageListContext
>['ItemContent'] = (props) => {
  const svc = useInjection(MessageItemSvc);
  const { data } = props;
  const ownMessage = data.user === 'me';
  if (ownMessage) return <OwnMessage {...data} />;
  const item = svc.getItem(data.type ?? REPLY_MESSAGE_TYPE);
  return item.render(data);
};
