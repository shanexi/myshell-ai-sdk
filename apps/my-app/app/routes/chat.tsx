import {
  BotInfo,
  ChatFoot,
  ChatInputRoot,
  ChatRoot,
  ChatTopRoot,
  randomMessage,
} from '@myshell-run/ui-biz';
import { createRoute } from '../createRoute';
import {
  ChatInputMenuIsland,
  ChatMessageListIsland,
  ChatTopMenuIsland,
} from '../islands/chat';

export default createRoute(async (c) => {
  const initialMessages = [randomMessage('me')];
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
        initialMessages={initialMessages}
      />
      {/* <Counter initial={10}></Counter> */}
      <ChatFoot>
        <ChatInputRoot>
          <ChatInputMenuIsland />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
