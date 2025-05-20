import { ChatInput } from './chat-input';
import { ChatMessageList } from './chat-message-list';

export const Chat = () => {
  return (
    <div className="flex h-full flex-col">
      <ChatMessageList
        className="flex flex-grow flex-col overflow-auto px-[8px]"
        initialMessages={[]}
      />
      <ChatInput />
    </div>
  );
};
