import { BotInfo } from './bot-info';
import { ChatInput } from './chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTop } from './chat-top';

export function Chat() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-none">
        <ChatTop />
      </div>
      <div className="flex-grow overflow-auto px-[8px]">
        <ChatMessageList />
      </div>
      <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
        <ChatInput />
        <BotInfo />
      </div>
    </div>
  );
}
