import * as React from 'react';
import {
  type VirtuosoMessageListProps,
  type VirtuosoMessageListMethods,
  VirtuosoMessageListLicense,
  VirtuosoMessageList,
} from '@virtuoso.dev/message-list';

interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

let idCounter = 0;

export function randomMessage(user: Message['user']): Message {
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

// 生成随机文本的辅助函数
export function randPhrase(): string {
  const phrases = [
    '你好！',
    '很高兴见到你',
    '今天天气怎么样？',
    '我能帮你什么忙？',
    '这是一个测试',
    '请问有什么需要？',
    '我在这里',
    '有问题随时问我',
    '希望一切顺利',
    '祝你有美好的一天',
    '需要帮助吗？',
    '我是聊天机器人',
    '让我们开始聊天吧',
    '有什么有趣的事情？',
    '我们来聊聊吧',
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 生成指定长度范围内的随机文本
export function randTextRange({
  min,
  max,
}: {
  min: number;
  max: number;
}): string {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = '';

  while (result.length < length) {
    result += randPhrase() + ' ';
  }

  // 截取到指定长度
  return result.slice(0, length);
}
