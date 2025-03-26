import { Database, Message } from '@myshell-run/simple-prisma';
import { Message as CMessage } from '@myshell-run/def';
import {
  BotInfo,
  ChatFoot,
  ChatInputMenu,
  ChatInputRoot,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/ui-biz';
import { Kysely } from 'kysely';
import { createRoute } from '../createRoute';
import { ChatMessageListIsland } from '../islands/chat';
import { D1Dialect } from '../kysely-d1';

export default createRoute(async (c) => {
  let messages: CMessage[] = [];
  if (import.meta.env.VITE_SSG !== '1') {
    const db = new Kysely<Database>({
      dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
    });
    const msgs = await db
      .selectFrom('message')
      .select(['id', 'text', 'senderId'])
      .where('sessionId', '=', `bot-6`)
      .orderBy('createdAt')
      .limit(10)
      .execute();
    messages = msgs.map((msg) => ({
      key: msg.id,
      text: msg.text,
      user: msg.senderId.includes('bot') ? 'other' : 'me',
    }));
  }
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
      />
      <ChatFoot>
        <ChatInputRoot>
          {/* react-aria ssr 有问题 */}
          <ChatInputMenu />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
