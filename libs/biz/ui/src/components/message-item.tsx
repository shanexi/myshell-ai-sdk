import {
  OwnMessage,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/message-item-plugins';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';
import { useInjection } from '@myshell-run/common-ui';
import { MessageItemSvc } from './message-item.svc';
import { Message, MessageListContext } from '@myshell-run/common-def';

export const MessageItem: VirtuosoMessageListProps<
  Message,
  MessageListContext
>['ItemContent'] = (props) => {
  const svc = useInjection(MessageItemSvc);
  const { data } = props;
  const ownMessage = data.user === 'me';
  const { key, ...rest } = data;
  if (ownMessage) return <OwnMessage key={data.key} {...rest} />;
  const item = svc.getItem(data.type ?? REPLY_MESSAGE_TYPE);
  return item.render(data);
};
