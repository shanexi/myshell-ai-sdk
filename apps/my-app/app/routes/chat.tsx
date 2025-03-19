import {
  BotInfo,
  ChatFoot,
  ChatInputRoot,
  ChatRoot,
  ChatTop,
} from '@myshell-run/ui-biz';
import { createRoute } from '../createRoute';
import { ChatInputMenuIsland, ChatMessageListIsland } from '../islands/chat';

export default createRoute(async (c) => {
  return c.render(
    <ChatRoot>
      <div className="flex-none">
        <ChatTop />
      </div>
      <ChatMessageListIsland className="flex-grow overflow-auto px-[8px]" />
      <ChatFoot>
        <ChatInputRoot>
          <ChatInputMenuIsland />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
