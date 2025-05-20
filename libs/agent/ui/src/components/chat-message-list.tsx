import { Message, MessageListContext } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { CSSProperties, useEffect, useRef } from 'react';
import { MessageItem } from './message-item';
import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
} from '@virtuoso.dev/message-list';
import { AgentChatModel } from './agent-chat.model';

// TODO 这块代码应该也能 common
export function ChatMessageList(props: {
  className?: string;
  style?: CSSProperties;
  licenseKey?: string;
  initialMessages?: Message[];
}) {
  const model = useInjection(AgentChatModel);
  const { className, style, licenseKey, initialMessages } = props;
  const virtuoso =
    useRef<VirtuosoMessageListMethods<Message, MessageListContext>>(null);
  useEffect(() => {
    model.chatCommon.setVirtuosoRef(virtuoso);
  }, []);

  return (
    // 必须 flex flex-col 才能让 `virtuoso.current.scrollToItem({ index: 0, align: "end" })` 正常工作，原因未细究，参考 https://virtuoso.dev/virtuoso-message-list/examples/ai-chatbot/
    <div className={cn('flex flex-col', className)} style={style}>
      <VirtuosoMessageListLicense licenseKey={licenseKey || ''}>
        <VirtuosoMessageList<Message, MessageListContext>
          id="x-agent-message-list"
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
