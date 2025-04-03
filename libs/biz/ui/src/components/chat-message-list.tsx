import { Message, MessageListContext } from '@myshell-run/def';
import { cn, useInjection } from '@myshell-run/ui-primitives';
import { CSSProperties, useEffect, useRef } from 'react';
import { MessageItem } from './message-item';
import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
} from '@virtuoso.dev/message-list';
import { ChatModel } from './chat.model';
import { DbBot } from '@myshell-run/biz-def';

// 注意 VirtuosoMessageList 不要 observer
export function ChatMessageList(props: {
  className?: string;
  style?: CSSProperties;
  licenseKey?: string;
  initialMessages?: Message[];
  bot?: DbBot;
}) {
  const model = useInjection(ChatModel);
  const { className, style, licenseKey, initialMessages, bot } = props;
  const virtuoso =
    useRef<VirtuosoMessageListMethods<Message, MessageListContext>>(null);
  useEffect(() => {
    model.setVirtuosoRef(virtuoso);
    model.setBot(bot);
  }, []);

  // mock data
  // const myMessage = randomMessage('me');
  /*  useEffect(() => {
    // virtuoso.current?.data.append(
    //   [myMessage],
    //   ({ scrollInProgress, atBottom }) => {
    //     return {
    //       index: 'LAST',
    //       align: 'end',
    //       behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
    //     };
    //   },
    // );

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
                    ? AGENT_MESSAGE_LIST_DIRECTORY_TYPE
                    : REPLY_MESSAGE_EXECUTING_TYPE,
              }
            : message;
        }, 'smooth');
      }, 150);
    }, 1000);
  }, []); */

  return (
    // 必须 flex flex-col 才能让 `virtuoso.current.scrollToItem({ index: 0, align: "end" })` 正常工作，原因未细究，参考 https://virtuoso.dev/virtuoso-message-list/examples/ai-chatbot/
    <div className={cn('flex flex-col', className)} style={style}>
      <VirtuosoMessageListLicense licenseKey={licenseKey || ''}>
        <VirtuosoMessageList<Message, MessageListContext>
          id="x-chat-message-list"
          ref={virtuoso}
          context={{}}
          style={{ flex: 1, scrollbarWidth: 'none' }}
          computeItemKey={({ data }) => data.key}
          initialLocation={{ index: 'LAST', align: 'end' }}
          // TODO ssr 只支持 top, 因为 bottom 需要计算 marginTop
          // shortSizeAlign="bottom"
          initialData={initialMessages}
          ItemContent={MessageItem}
        />
      </VirtuosoMessageListLicense>
    </div>
  );
}
