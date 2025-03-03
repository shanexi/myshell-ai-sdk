import {
  type VirtuosoMessageListProps,
  type VirtuosoMessageListMethods,
  VirtuosoMessageListLicense,
  VirtuosoMessageList,
} from '@virtuoso.dev/message-list';
import { useEffect, useRef } from 'react';
import { randPhrase, randomMessage } from './chat-demo';
import { cn } from '../utils';

interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

const ItemContent: VirtuosoMessageListProps<Message, null>['ItemContent'] = ({
  data,
}) => {
  const ownMessage = data.user === 'me';

  return (
    <div className="flex pb-8">
      <div
        className={cn(
          'max-w-[80%] rounded-2xl p-4',
          ownMessage
            ? 'ml-auto bg-surface-primary-subtle-default-light text-text-brand-light'
            : 'bg-surface-default-light text-text-default-light',
        )}
      >
        {data.text}
      </div>
    </div>
  );
};

export function ChatMessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message>>(null);

  // mock data
  useEffect(() => {
    const myMessage = randomMessage('me');
    virtuoso.current?.data.append(
      [myMessage],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'end',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
        };
      },
    );

    setTimeout(() => {
      const botMessage = randomMessage('other');
      virtuoso.current?.data.append([botMessage]);

      let counter = 0;
      const interval = setInterval(() => {
        if (counter++ > 20) {
          clearInterval(interval);
        }
        virtuoso.current?.data.map((message) => {
          return message.key === botMessage.key
            ? { ...message, text: message.text + ' ' + randPhrase() }
            : message;
        }, 'smooth');
      }, 150);
    }, 1000);
  }, []);

  return (
    <VirtuosoMessageListLicense licenseKey="">
      <VirtuosoMessageList<Message, null>
        ref={virtuoso}
        style={{ flex: 1 }}
        computeItemKey={({ data }) => data.key}
        initialLocation={{ index: 'LAST', align: 'end' }}
        shortSizeAlign="bottom-smooth"
        ItemContent={ItemContent}
      />
    </VirtuosoMessageListLicense>
  );
}
