import {
  BotInfo,
  ChatFoot,
  ChatInputRoot,
  ChatRoot,
  ChatTopRoot,
} from '@myshell-run/ui-biz';
import { createRoute } from '../createRoute';
import {
  ChatInputMenuIsland,
  ChatMessageListIsland,
  ChatTopMenuIsland,
} from '../islands/chat';

export default createRoute(async (c) => {
  return c.render(
    <ChatRoot>
      <div className="flex-none">
        <ChatTopRoot>
          <ChatTopMenuIsland />
        </ChatTopRoot>
      </div>
      <ChatMessageListIsland
        className="flex flex-grow flex-col overflow-auto px-[8px]"
        licenseKey={c.env.LIC}
      />
      <ChatFoot>
        <ChatInputRoot>
          <ChatInputMenuIsland />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
