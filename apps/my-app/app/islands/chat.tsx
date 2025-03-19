import { ChatInputMenu, ChatMessageList } from '@myshell-run/ui-biz';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { container } from './container';

export const ChatInputMenuIsland = ChatInputMenu;

export const ChatMessageListIsland = (props: { className?: string }) => {
  return (
    <InversifyProvider container={container}>
      <ChatMessageList />
    </InversifyProvider>
  );
};
