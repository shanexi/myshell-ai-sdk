import {
  OwnMessageItem,
  ReplyMessageItem,
} from '@myshell-run/message-item-plugins';
import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';

export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

export const MessageItem: VirtuosoMessageListProps<
  Message,
  null
>['ItemContent'] = (props) => {
  const { data } = props;
  // todo: message item plugin
  const ownMessage = data.user === 'me';
  if (ownMessage) return <OwnMessageItem {...data} />;
  return <ReplyMessageItem {...data} />;
};
