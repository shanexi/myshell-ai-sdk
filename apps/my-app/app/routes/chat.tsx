import { createRoute } from '../createRoute';
import { BotInfo, ChatInputRoot, ChatTop } from '@myshell-run/ui-biz';
import { ChatInputMenuIsland } from '../islands/chat';

export default createRoute(async (c) => {
  return c.render(
    <div className="flex h-screen flex-col bg-surface-container-default-light">
      <div className="flex-none">
        <ChatTop />
      </div>
      123
      <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
        <ChatInputRoot>
          <ChatInputMenuIsland />
        </ChatInputRoot>
        <BotInfo />
      </div>
    </div>,
  );
});
