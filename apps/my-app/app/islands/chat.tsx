import { Message } from '@myshell-run/def';
import {
  ChatInput,
  ChatInputMenu,
  ChatMessageList,
  ChatTopMenu,
} from '@myshell-run/ui-biz';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { clientContainer } from './client.container';

export const ChatInputMenuIsland = ChatInputMenu;

export const ChatMessageListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialMessages: Message[];
  botAvatar?: string;
}) => {
  const { className, licenseKey, initialMessages, botAvatar } = props;
  return (
    <InversifyProvider container={clientContainer}>
      <ChatMessageList
        className={className}
        licenseKey={licenseKey}
        initialMessages={initialMessages.map((msg) => ({
          ...msg,
          // 这样写 而不是在 ssr 层就 map 好，是为了减少 ssr 体积
          avatar: botAvatar,
        }))}
      />
    </InversifyProvider>
  );
};

export const ChatTopMenuIsland = ChatTopMenu;

export const ChatInputIsland = (props: { userId: string }) => {
  const { userId } = props;
  return (
    <InversifyProvider container={clientContainer}>
      <ChatInput userId={userId} />
    </InversifyProvider>
  );
};
