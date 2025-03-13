import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageListLicense,
  VirtuosoMessageList,
} from '@virtuoso.dev/message-list';
import { useEffect, useRef } from 'react';
import { Message, MessageItem } from './message-item';
import { randPhrase, randomMessage } from './chat-demo';
import {
  REPLY_MESSAGE_EXECUTING_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/message-item-plugins';

export type MessageListContext = {
  //
};

export function ChatMessageList() {
  const virtuoso =
    useRef<VirtuosoMessageListMethods<Message, MessageListContext>>(null);

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
      virtuoso.current?.data.append([
        {
          ...botMessage,
          type: REPLY_MESSAGE_EXECUTING_TYPE,
        },
      ]);

      let counter = 0;
      const interval = setInterval(() => {
        if (counter++ > 20) {
          clearInterval(interval);
        }
        virtuoso.current?.data.map((message) => {
          return message.key === botMessage.key
            ? {
                ...message,
                text: message.text + ' ' + randPhrase(),
                type:
                  counter > 20
                    ? REPLY_MESSAGE_TYPE
                    : REPLY_MESSAGE_EXECUTING_TYPE,
              }
            : message;
        }, 'smooth');
      }, 150);
    }, 1000);
  }, []);

  return (
    <VirtuosoMessageListLicense licenseKey="">
      <VirtuosoMessageList<Message, MessageListContext>
        ref={virtuoso}
        context={{}}
        style={{ flex: 1 }}
        computeItemKey={({ data }) => data.key}
        initialLocation={{ index: 'LAST', align: 'end' }}
        shortSizeAlign="bottom-smooth"
        ItemContent={MessageItem}
      />
    </VirtuosoMessageListLicense>
  );
}
