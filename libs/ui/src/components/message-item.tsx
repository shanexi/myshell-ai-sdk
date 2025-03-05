import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';
import { cn } from '../utils';

export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

export const MessageItem: VirtuosoMessageListProps<
  Message,
  null
>['ItemContent'] = ({ data }) => {
  const ownMessage = data.user === 'me';

  return (
    <div className="flex pb-8">
      <div
        className={cn(
          'max-w-[80%] rounded-br-[16px] rounded-bl-[16px] p-4',
          ownMessage
            ? 'ml-auto rounded-tl-[16px] rounded-tr-[2px] bg-surface-primary-subtle-default-light text-text-brand-light'
            : 'rounded-tl-[2px] rounded-tr-[16px] bg-surface-default-light text-text-default-light',
        )}
      >
        {data.text}
      </div>
    </div>
  );
};
