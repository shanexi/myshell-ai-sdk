import { Chat } from '../chat';
import { Chat as PreviewChat } from '@myshell-run/preview-chat-ui';
import { cn } from '@myshell-run/common-ui';
import { ShellAgentChatModel } from './shellagent-chat.model';
import { useInjection } from 'inversify-react';

export const ShellAgentChat = () => {
  const model = useInjection(ShellAgentChatModel);

  return (
    <div className={cn('flex h-full w-full')}>
      <div className={cn('flex-1 border-r border-gray-200')}>
        <Chat />
      </div>
      <div className={cn('flex-1')}>
        <PreviewChat />
        {/* <button
          className="btn"
          onClick={() => {
            model.addToContext({
              type: 'canvas',
              content: {
                name: 'This is canvas',
                a: 'b',
              },
            });
          }}
        >
          Add to Chat
        </button> */}
      </div>
    </div>
  );
};
