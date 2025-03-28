import { Message } from '@myshell-run/biz-def';
import {
  ChatInput,
  ChatInputMenu,
  ChatMessageList,
  ChatTopMenu,
} from '@myshell-run/biz-ui';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { clientContainer } from './client.container';
import { Bot } from '@myshell-run/simple-prisma';

export const ChatInputMenuIsland = ChatInputMenu;

export const ChatMessageListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialMessages: Message[];
  bot?: Bot;
}) => {
  const { className, licenseKey, initialMessages, bot } = props;
  return (
    <InversifyProvider container={clientContainer}>
      <ChatMessageList
        className={className}
        licenseKey={licenseKey}
        initialMessages={initialMessages.map((msg) => ({
          ...msg,
          // 这样写 而不是在 ssr 层就 map 好，是为了减少 ssr 体积
          avatar: bot?.avatar,
        }))}
        bot={bot}
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
