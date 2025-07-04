import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps,
} from '@virtuoso.dev/message-list';
import { randPhrase, randTextRange } from '@ngneat/falso';
import { useEffect, useRef, useState } from 'react';
import { editable, InferDoc, schema } from 'edix';

const basicSchema = schema({ multiline: true });

interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

let idCounter = 0;

function randomMessage(user: Message['user']): Message {
  return {
    user,
    key: `${idCounter++}`,
    text: randTextRange({ min: user === 'me' ? 20 : 100, max: 200 }),
  };
}

const ItemContent: VirtuosoMessageListProps<Message, null>['ItemContent'] = ({
  data,
}) => {
  const ownMessage = data.user === 'me';
  return (
    <div style={{ paddingBottom: '2rem', display: 'flex' }}>
      <div
        style={{
          maxWidth: '60%',
          marginLeft: data.user === 'me' ? 'auto' : undefined,
          border: '1px solid var(--border)',
          background: ownMessage
            ? 'var(--background)'
            : 'var(--alt-background)',
          color: 'var(--foreground)',
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        {data.text}
      </div>
    </div>
  );
};

export function ChatDemoA() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message>>(null);

  const ref = useRef<HTMLDivElement>(null);
  type Doc = InferDoc<typeof basicSchema>;
  const [value, setValue] = useState<Doc>([
    [{ type: 'text', text: 'Hello World.' }],
    [{ type: 'text', text: 'こんにちは。' }],
    [{ type: 'text', text: '👍❤️🧑‍🧑‍🧒' }],
  ]);

  useEffect(() => {
    if (!ref.current) return;
    return editable(ref.current, {
      schema: basicSchema,
      onChange: setValue,
    }).dispose;
  }, []);

  return (
    <div
      className="wide-example"
      style={{
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        // fontSize: '70%',
      }}
    >
      <VirtuosoMessageListLicense licenseKey="">
        <VirtuosoMessageList<Message, null>
          initialData={Array.from({ length: 100 }, (_, index) =>
            randomMessage(index % 2 === 0 ? 'me' : 'other'),
          )}
          ref={virtuoso}
          style={{ flex: 1 }}
          computeItemKey={({ data }) => data.key}
          initialLocation={{ index: 'LAST', align: 'end' }}
          ItemContent={ItemContent}
        />
      </VirtuosoMessageListLicense>
      <button
        style={{ marginTop: '1rem', fontSize: '1.1rem', padding: '1rem' }}
        onClick={(e) => {
          (e.target as HTMLButtonElement).disabled = true;
          const myMessage = randomMessage('me');
          virtuoso.current?.data.append(
            [myMessage],
            ({ scrollInProgress, atBottom }) => {
              return {
                index: 'LAST',
                align: 'start',
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
                (e.target as HTMLButtonElement).disabled = false;
              }
              virtuoso.current?.data.map((message) => {
                return message.key === botMessage.key
                  ? {
                      ...message,
                      text: message.text + ' ' + randPhrase(),
                    }
                  : message;
              }, 'smooth');
            }, 150);
          }, 1000);
        }}
      >
        Ask the bot a question!
      </button>
      <div
        ref={ref}
        style={{
          backgroundColor: 'white',
          border: 'solid 1px darkgray',
          padding: 8,
        }}
      >
        {value.map((r, i) => (
          <div key={i}>
            {r.length ? r.map((n, j) => <span key={j}>{n.text}</span>) : <br />}
          </div>
        ))}
      </div>
    </div>
  );
}
