import { Message as CMessage } from '@myshell-run/def';
import { Database } from '@myshell-run/simple-prisma';
import {
  BotInfo,
  ChatFoot,
  ChatInput,
  ChatInputAudio,
  ChatInputFile,
  ChatInputMenu,
  ChatInputRoot,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/ui-biz';
import { Kysely } from 'kysely';
import { createRoute } from '../create-route';
import { ChatInputIsland, ChatMessageListIsland } from '../islands/chat';
import { D1Dialect } from '../kysely-d1';
import { getAuth } from '@hono/clerk-auth';
// import { createClerkClient } from '@clerk/backend';

export default createRoute(async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.redirect('/signin');
  }
  // 请求一般在用到再发送，不会再 ssr 这里，影响 TTFB
  // const clerk = createClerkClient({
  //   secretKey: c.env.CLERK_SECRET_KEY,
  // });
  // const user = await clerk.users.getUser(auth.userId);
  // console.log('user', user.emailAddresses[0].emailAddress);

  let messages: CMessage[] = [];
  if (import.meta.env.VITE_SSG !== '1') {
    const db = c.get('db');
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
          <ChatInputFile />
          <ChatInputIsland className="grow" userId={auth.userId} />
          <ChatInputAudio />
        </ChatInputRoot>
        <BotInfo />
      </ChatFoot>
    </ChatRoot>,
  );
});
