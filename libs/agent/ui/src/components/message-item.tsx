import {
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/agent-message-item-plugins';
import { Message, MessageListContext } from '@myshell-run/common-def';
import { MessageItemSvc, useInjection } from '@myshell-run/common-ui';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';

export const MessageItem: VirtuosoMessageListProps<
  Message,
  MessageListContext
>['ItemContent'] = (props) => {
  const svc = useInjection(MessageItemSvc);
  const { data } = props;
  const ownMessage = data.user === 'me';
  const item = svc.getItem(
    ownMessage ? OWN_MESSAGE_TYPE : (data.type ?? REPLY_MESSAGE_TYPE),
  );
  return item.render(data);
};
