import { Message } from '@myshell-run/common-def';
import {
  ChatInput,
  ChatInputMenu,
  ChatMessageList,
  ChatTopMenu,
} from '@myshell-run/biz-ui';
import { DbBot } from '@myshell-run/biz-def';
import { ContainerProvider } from './container-provider';

export const ChatInputMenuIsland = ChatInputMenu;

export const ChatMessageListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialMessages: Message[];
  bot?: DbBot;
}) => {
  const { className, licenseKey, initialMessages, bot } = props;
  return (
    <ContainerProvider>
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
    </ContainerProvider>
  );
};

export const ChatTopMenuIsland = ChatTopMenu;

export const ChatInputIsland = () => {
  return (
    <ContainerProvider>
      <ChatInput />
    </ContainerProvider>
  );
};
