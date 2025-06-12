import { Chat } from '../chat';
import { Chat as PreviewChat } from '@myshell-run/preview-chat-ui';
import { cn } from '@myshell-run/common-ui';

export const ShellAgentChat = () => {
  return (
    <div className={cn('flex h-full w-full')}>
      <div className={cn('flex-1 border-r border-gray-200')}>
        <Chat />
      </div>
      <div className={cn('flex-1')}>
        <PreviewChat />
      </div>
    </div>
  );
};
