import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';
import { useInjection } from 'inversify-react';
import { MessageItemSvc } from './message-item.svc';

export const MessageItem: VirtuosoMessageListProps<
  StrictMessage,
  MessageListContext
>['ItemContent'] = (props) => {
  const svc = useInjection(MessageItemSvc);
  const { data } = props;
  const item = svc.getItem(data.type);
  return item.render(data);
};
