import { DbBot } from '@myshell-run/biz-def';
import { Tracing } from '@myshell-run/biz-service';
import {
  BotInfo,
  ChatFoot,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/biz-ui';
import { Message } from '@myshell-run/common-def';
import { createRoute } from '../create-route';
import { ChatInputIsland, ChatMessageListIsland } from '../islands/chat';
import { requireAuth } from '../middlewares/require-auth';

export default createRoute(requireAuth, async (c) => {
  // getUser(c);
  const botId = c.req.query('botId');
  if (botId == null) {
    return Tracing.startSpan('no_bot_id', () =>
      c.html(`<div>botId is required</div>`),
    );
  }
  if (isNaN(Number(botId))) {
    return Tracing.startSpan('bot_id_is_nan', () =>
      c.html(`<div>botId is not a number</div>`),
    );
  }

  let messages: Message[] = [];
  const db = c.get('db');
  const [msgs, dbBot] = await Tracing.startSpan('db_get_msgs_bot', () =>
    Promise.all([
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
    ]),
  );
  const bot = dbBot[0] as DbBot;

  messages = msgs.reverse().map<Message>((msg) => ({
    key: msg.id,
    text: msg.text,
    user: msg.senderId.includes('bot') ? 'other' : 'me',
    // avatar: bot?.avatar,
  }));
  return Tracing.startSpan('ssr', () =>
    c.render(
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
    ),
  );
});
