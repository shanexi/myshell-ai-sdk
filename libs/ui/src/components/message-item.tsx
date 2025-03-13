import {
  OwnMessage,
  REPLY_MESSAGE_TYPE,
  ReplyMessage,
} from '@myshell-run/message-item-plugins';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';
import { useInjection } from 'inversify-react';
import { MessageItemSvc } from './message-item.svc';
import { MessageListContext } from './chat-message-list';

export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
  type?: string;
}

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
