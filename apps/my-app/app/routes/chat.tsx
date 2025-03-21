import {
  BotInfo,
  ChatFoot,
  ChatInputMenu,
  ChatInputRoot,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
  randomMessage,
} from '@myshell-run/ui-biz';
import { createRoute } from '../createRoute';
import { ChatMessageListIsland } from '../islands/chat';

export default createRoute(async (c) => {
  const initialMessages = [
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
  ];
  return c.render(
    <ChatRoot>
      <div className="flex-none">
        <ChatTopRoot>
          {/* <ChatTopMenuIsland /> */}
          <ChatTopMenu />
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
          {/* <ChatInputMenuIsland /> */}
          <ChatInputMenu />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
