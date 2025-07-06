import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  type VirtuosoMessageListMethods,
} from '@virtuoso.dev/message-list';
import { CSSProperties, useEffect, useRef } from 'react';
import { ChatCommonModel } from './chat-common.model';
import { cn } from '../utils';
import { MessageItem } from '../message-plugin/message-item';

export const ChatMessageList: React.FC<{
  chatCommonModel: ChatCommonModel;
  className?: string;
  style?: CSSProperties;
  licenseKey?: string;
  initialMessages?: StrictMessage[];
}> = ({ className, style, licenseKey, initialMessages, chatCommonModel }) => {
  const virtuoso =
    useRef<VirtuosoMessageListMethods<StrictMessage, MessageListContext>>(null);
  useEffect(() => {
    chatCommonModel.virtuosoModel.setVirtuosoRef(virtuoso);
  }, []);

  return (
    // 必须 flex flex-col 才能让 `virtuoso.current.scrollToItem({ index: 0, align: "end" })` 正常工作，原因未细究，参考 https://virtuoso.dev/virtuoso-message-list/examples/ai-chatbot/
    <div className={cn('flex flex-col', className)} style={style}>
      <VirtuosoMessageListLicense licenseKey={licenseKey || ''}>
        <VirtuosoMessageList<StrictMessage, MessageListContext>
          id="x-agent-message-list"
          ref={virtuoso}
          context={{}}
          style={{ flex: 1, scrollbarWidth: 'none' }}
          computeItemKey={({ data }) => data.key}
          initialLocation={{ index: 'LAST', align: 'start' }}
          // TODO ssr 只支持 top, 因为 bottom 需要计算 marginTop
          // shortSizeAlign="bottom"
          initialData={initialMessages}
          ItemContent={MessageItem}
        />
      </VirtuosoMessageListLicense>
    </div>
  );
};
