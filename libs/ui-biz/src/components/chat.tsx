import { BotInfo } from './bot-info';
import { ChatInputRoot } from './chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTop } from './chat-top';

export function Chat() {
  return (
    <div className="flex h-screen flex-col bg-surface-container-default-light">
      <div className="flex-none">
        <ChatTop />
      </div>
      <ChatMessageList className="flex-grow overflow-auto px-[8px]" />
      <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
        <ChatInputRoot />
        <BotInfo />
      </div>
    </div>
  );
}
