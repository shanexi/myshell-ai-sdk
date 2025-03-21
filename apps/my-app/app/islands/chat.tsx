import {
  ChatInputMenu,
  ChatMessageList,
  ChatTopMenu,
} from '@myshell-run/ui-biz';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { container } from './container';
import { Message } from '@myshell-run/def';

export const ChatInputMenuIsland = ChatInputMenu;

export const ChatMessageListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialMessages: Message[];
}) => {
  const { className, licenseKey, initialMessages } = props;
  return (
    <InversifyProvider container={container}>
      {/* 必须 flex flex-col 才能让 `virtuoso.current.scrollToItem({ index: 0, align: "end" })` 正常工作，原因未细究，参考 https://virtuoso.dev/virtuoso-message-list/examples/ai-chatbot/ */}
      {/* FIXME 这里和 ChatMessageList 的 flex flex-col 重复了 但是效果上没有问题 */}
      <ChatMessageList
        className={className}
        licenseKey={licenseKey}
        initialMessages={initialMessages}
      />
    </InversifyProvider>
  );
};

export const ChatTopMenuIsland = ChatTopMenu;
