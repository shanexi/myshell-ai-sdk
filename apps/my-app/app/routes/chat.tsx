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
  const initialMessages = [
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
    randomMessage('me'),
  ];
  return c.render(
    <ChatRoot>
      <div className="flex-none">
        <ChatTopRoot>
          <ChatTopMenuIsland />
        </ChatTopRoot>
      </div>
      <ChatMessageListIsland
        className="flex flex-grow flex-col overflow-auto"
        // TODO ssg 环境拿到 c.env? 先避免报错
        licenseKey={c?.env?.LIC}
        initialMessages={initialMessages}
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
