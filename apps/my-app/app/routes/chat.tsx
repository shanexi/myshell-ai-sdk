import { Message as CMessage, DbBot } from '@myshell-run/biz-def';
import {
  BotInfo,
  ChatFoot,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/biz-ui';
import { createRoute } from '../create-route';
import { ChatInputIsland, ChatMessageListIsland } from '../islands/chat';
import { requireAuth } from '../middlewares/require-auth';

export default createRoute(requireAuth, async (c) => {
  // getUser(c);
  const botId = c.req.query('botId');
  if (botId == null) {
    return c.html(`<div>botId is required</div>`);
  }
  if (isNaN(Number(botId))) {
    return c.html(`<div>botId is not a number</div>`);
  }

  let messages: CMessage[] = [];
  const db = c.get('db');
  console.time('db');
  const [msgs, dbBot] = await Promise.all([
    db
      .selectFrom('message')
      .select(['id', 'text', 'senderId'])
      .where('sessionId', '=', `bot-${botId}`)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .execute(),
    db
      .selectFrom('bot')
      .select(['id', 'avatar', 'name', 'isOfficial'])
      .where('id', '=', Number(botId))
      .execute(),
  ]);
  console.timeEnd('db');

  const bot = dbBot[0] as DbBot;

  messages = msgs.reverse().map((msg) => ({
    key: msg.id,
    text: msg.text,
    user: msg.senderId.includes('bot') ? 'other' : 'me',
    // avatar: bot?.avatar,
  }));
  return c.render(
    <ChatRoot>
      <div className="flex-none">
        <ChatTopRoot>
          <ChatTopMenu />
        </ChatTopRoot>
      </div>
      <ChatMessageListIsland
        className="flex flex-grow flex-col overflow-auto"
        // TODO ssg 环境拿到 c.env? 先避免报错
        licenseKey={c?.env?.LIC}
        initialMessages={messages}
        bot={bot}
      />
      <ChatFoot>
        <ChatInputIsland />
        <BotInfo bot={bot} />
      </ChatFoot>
    </ChatRoot>,
  );
});
