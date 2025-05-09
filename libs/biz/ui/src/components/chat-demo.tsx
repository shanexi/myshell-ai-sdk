import * as React from 'react';
import {
  type VirtuosoMessageListProps,
  type VirtuosoMessageListMethods,
  VirtuosoMessageListLicense,
  VirtuosoMessageList,
} from '@virtuoso.dev/message-list';
import { randomMessage } from '@myshell-run/common-ui';
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
    <div style={{ paddingBottom: '2rem', display: 'flex' }}>
      <div
        style={{
          maxWidth: '80%',
          marginLeft: data.user === 'me' ? 'auto' : undefined,

          background: ownMessage ? '#0253B3' : '#F0F0F3',
          color: ownMessage ? 'white' : 'black',
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        {data.text}
      </div>
    </div>
  );
};

export function ChatDemo() {
  const virtuoso = React.useRef<VirtuosoMessageListMethods<Message>>(null);
  React.useEffect(() => {
    (window as any).vref = virtuoso.current;
  }, []);
  return (
    <div
      className="tall-example"
      style={{
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        // fontSize: '70%',
      }}
    >
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

      <button
        onClick={() => {
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
        }}
      >
        Ask the bot a question!
      </button>
    </div>
  );
}
